import os
import kombu
import socket as sock

from amqp.exceptions import ConnectionForced
from gevent._semaphore import BoundedSemaphore
from geventwebsocket import WebSocketError
from kombu.pools import connections

RABBITMQ_HOST = 'localhost'
RABBITMQ_USER = 'guest'
RABBITMQ_PASSWORD = 'guest'
RABBITMQ_QUEUE_EXPIRES = 300.0      # seconds
RABBITMQ_MESSAGE_EXPIRES = RABBITMQ_QUEUE_EXPIRES

BROKER_URL = f'amqp://{RABBITMQ_USER}:{RABBITMQ_PASSWORD}@{RABBITMQ_HOST}'

semaphore = BoundedSemaphore()

class AMQPBrokwer():
    def __init__(self):
        self.pid = 'websocket-pid(' + str(os.getpid()) + ')'
        self.connection = kombu.Connection(
            hostname=f'{BROKER_URL}',
            userid=RABBITMQ_USER,
            password=RABBITMQ_PASSWORD
        )
        self.queue = None
        self.consumer = None
        self.sockets = {}
        self.closed = False
        self.recent_drained = None
    
    def ensure_consuming(self, force=False):
        if self.closed and not force: return
        while True:
            try:
                if self.queue: return

                with ConnectionContext(self.connection, no_release=True) as conn:
                    channel = conn.default_channel
                    print('channel:', conn.__dict__)
                    # Queue 생성
                    self.queue = kombu.Queue(
                        sock.gethostname() + "-" + self.pid, 
                        auto_delete=True, 
                        expires=RABBITMQ_QUEUE_EXPIRES,
                        channel=channel
                    )
                    self.queue.declare()

                    # Consumer 생성
                    self.consumer = kombu.Consumer(
                        channel,
                        [self.queue],
                        no_ack=False,
                        # on_message=
                        prefetch_count=1
                    )
                    self.consumer.consume()
                    
            except BrokenPipeError as err:
                self.queue = None
                conn.release()

            except Exception as err:
                print(err)
                self.queue = None
                conn.release()
                break

    def subscribe(self, key, socket, done_callback=None, force=False):
        self.ensure_consuming(force)
        if key not in self.sockets:
            self.sockets[key] = set()
            print(self.sockets.__dict__)


class ConnectionContext:

    def __init__(self, connection, no_release=False):
        self.connection = connection
        self.no_release = no_release
        self.conn = None
    
    def __enter__(self):
        '''
            semaphore로 수행할 부분을 acquire, release로 묶어준다.
        '''
        semaphore.acquire()
        # 스레드로 수행할 내용
        self.conn = connections[self.connection].acquire(block=True)
        self.conn.ensure_connection()
        """
            'kombu.pools.connections'는 pool group이다. 
            동일한 app 에서 1 pool : 1 connection instance 를 가질 수 있게 해준다.
            'block=True'는 a connection이 pool에 있는 동안 계속 차지하게 두는 것(?)
            => 즉, 여러개의 amqp channel / queue 를 생성하게 해준다는 건가...?
        """
        semaphore.release()
        return self.conn
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if not self.no_release:
            self.conn.release()


broker = AMQPBrokwer()

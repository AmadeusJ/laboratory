import json

from flask import Flask, render_template, request, jsonify
from werkzeug import debug

from gevent import monkey
from geventwebsocket import WebSocketServer, WebSocketError
from geventwebsocket.resource import WebSocketApplication, Resource
from geventwebsocket.websocket import MSG_SOCKET_DEAD

from werkzeug.debug import DebuggedApplication
from werkzeug.serving import run_with_reloader

import socketbroker

monkey.patch_all()

class ChatApplication(WebSocketApplication):

    def __init__(self, ws):
        super().__init__(ws)
        self.request = None
        self.group_broker_name = None
    
    def on_open(self, *args, **kwargs):
        """ 

        default function_
        웹 소켓 연결시 최초 실행 

        """
        print("[SUCCESS] WebScoket connected successfully!")
        return


    def on_close(self, *args, **kwargs):
        return
    

    def on_message(self, message, *args, **kwargs):
        """

        default function_        
        Client에서 socket.send()로 보내진 데이터가 들어오는 곳
        
        """
        try:
            if not message: return
            data = json.loads(message)

            getattr(self, data['command'])(data)    # 이름에 해당하는 객체 속성의 값을 가져옴

        except Exception as err:
            print("[ERROR] ", err)
            self.send_data({
                'command': 'error',
                'data': {
                    'exception': str(err)
                }
            })
        return
    

    def send_data(self, data):
        """

        custom function_
        Client로 데이터 쏘기

        """
        try:
            self.ws.send(json.dumps(data))
        except WebSocketError as err:
            if str(err) == MSG_SOCKET_DEAD:
                print('[ERROR] socket is dead while sending data')
            else:
                raise
        return


    def enter(self, data):
        self.group_broker_name = 'Amadeus'
        socketbroker.broker.subscribe(self.group_broker_name, self)
        self.send_data({
            'command': 'enter',
            'data': {
                'client_version': 'v1.0.0'
            }
        })
    
    
    def ping(self, data):
        pass



app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@run_with_reloader
def runserver():
    server = WebSocketServer(
        ('0.0.0.0', 5000),
        Resource([
            ('^/chat', ChatApplication),
            ('^/.*', DebuggedApplication(app))
        ]),
        debug=True
    )
    server.serve_forever()


if __name__ == '__main__':
    runserver()

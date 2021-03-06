// .ts에서 컴파일 하면 .js로 변환 되어진당..!!
var message:string = "Hello World"

console.log(message)

class Greeting {
    greet():void {
        console.log("Hello World!!!")
    }
}
var obj = new Greeting();
obj.greet();


// 아래처럼 변수 선언시 type을 선언해주면 된다
var name1:string = "John"
var score1:number = 50
var score2:number = 42.50
var sum = score1 + score2

console.log(name1)
console.log(score1)
console.log(score2)
console.log(sum)


/**
 * 
 * .ts에서는 변수의 타입을 다른 타입으로 assert 할 수 있다. 
 * 
 */

var str = '1'
var str2:number = <number> <any> str
console.log(typeof(str2))


/**
 * 
 * .ts에서 특정 타입으로 이미 선언이 되어 있으면, 
 * 컴파일 시, 다른 타입으로 정의하려 할 때 에러를 뿜는당
 */
var num = 2;
// num = "12"


// .ts이 제공하는 스코프에 따른 변수 타입 종류는 다음과 같음
// => 해당 변수의 scope의 밖에서 변수를 호출하면 에러를 발생 시킨다.
var global_num = 12         // global variable
class Numbers {
    num_val = 13            // class variable
    static sval = 10        // static field

    storeNum():void {
        var local_num = 14  // local variable
    }
}
console.log(Numbers.sval)   // static variable
var obj2 = new Numbers();
console.log(obj2.num_val)



//
var num2:number = -2
var result = num2 > 0 ? "positive" : "negative"
console.log(result)
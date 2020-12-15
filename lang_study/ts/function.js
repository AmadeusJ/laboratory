/**
 *
 * 함수는 기본적으로 아래 처럼 쓸 수 있다.
 * '?'를 붙이면 필수 인자는 아니라는 뜻
 *
 */
function disp_details(id, name, mail_id) {
    console.log("ID: ", id);
    console.log("Name: ", name);
    if (mail_id != undefined)
        console.log("Email Id", mail_id);
}
disp_details(123, "John");
disp_details(111, "Mary", "mary@xyz.com");
// 개수가 특정하지 않은 인자를 여러개 담아 리스트에 담을 때_ '...' 연산자를 쓸 수 있다.
function addNumbers() {
    var nums = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        nums[_i] = arguments[_i];
    }
    var i;
    var sum = 0;
    for (i = 0; i < nums.length; i++) {
        sum = sum + nums[i];
    }
    console.log("sum of the numbers: ", sum);
}
addNumbers(1, 2, 3);
addNumbers(10, 10, 10, 10, 10);
// lambda expression
// type 1
var foo = function (x) { return 10 + x; };
console.log(foo(100));
// type 2
var foo2 = function (x) {
    x = 10 + x;
    console.log(x);
};
foo2(200);
// "Syntactic Variations" => Other function types
var func = function (x) {
    if (typeof x == "number") {
        console.log(x + " is numeric");
    }
    else if (typeof x == "string") {
        console.log(x + " is a string");
    }
};
func(12);
func("Tom");
var display = function (x) {
    console.log("The function got " + x);
};
display(12);
var disp = function () {
    console.log("Function invoked");
};
disp();
var month = 0;
if (month <= 0 || month > 12) {
    month = Number.NaN;
    console.log("Month is " + month);
}
else {
    console.log("Value Accepted..");
}
function employee(id, name) {
    this.id = id;
    this.name = name;
}
var emp = new employee(123, "Smith");
employee.prototype.email = "smith@abc.com";
console.log("Employee 's Id: " + emp.id);
console.log("Employee's name: " + emp.name);
console.log("Employee's Email ID: " + emp.email);

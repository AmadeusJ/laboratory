/**
 * 
 * 함수는 기본적으로 아래 처럼 쓸 수 있다. 
 * '?'를 붙이면 필수 인자는 아니라는 뜻
 * 
 */
function disp_details(id:number, name:string, mail_id?:string) {
    console.log("ID: ", id)
    console.log("Name: ", name)

    if (mail_id != undefined)
    console.log("Email Id", mail_id)
}
disp_details(123, "John")
disp_details(111, "Mary", "mary@xyz.com")

// 개수가 특정하지 않은 인자를 여러개 담아 리스트에 담을 때_ '...' 연산자를 쓸 수 있다.
function addNumbers(...nums:number[]) {
    var i;
    var sum:number = 0;

    for (i = 0; i < nums.length; i++) {
        sum = sum + nums[i];
    }
    console.log("sum of the numbers: ", sum)
}
addNumbers(1, 2, 3)
addNumbers(10, 10, 10, 10, 10)
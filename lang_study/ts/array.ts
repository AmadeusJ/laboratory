/**
 * 
 * 배열에 담길 데이터들을 지정해 줄 수 있다.
 */

var alphas:string[];

alphas = ["1", "2,", "3", "4"]

console.log(alphas[0]);
console.log(alphas[1]);

var nums:number[] = [1, 2, 3, 4]
console.log(nums[0])
console.log(nums[1])
console.log(nums[2])
console.log(nums[3])


// 아래 처럼 생성자를 통해 바로 선언 가능
var arr_name:number[] = new Array(4)

for(var i = 0; i < arr_name.length; i++) {
    arr_name[i] = i * 2
    console.log(arr_name[i])
}


var etc:any[] = [1, 2, 3, '4', 5]
console.log(etc)


var multi:number[][] = [[1, 2, 3], [23, 24, 25]]
  


/**
 * 
 * Array Destructuring
 * 
 */
var arr:number[] = [12, 13]
var [x, y] = arr
console.log(x)
console.log(y)

var j:any;
var nums:number[] = [1001, 1002, 1003, 1004]

for (j in nums) {
    console.log(nums[j])
}




// Tuple

var tup = []
tup[0] = 12
tup[1] = 12
console.log(tup[0], tup[1])

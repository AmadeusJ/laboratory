/**
 *
 * 배열에 담길 데이터들을 지정해 줄 수 있다.
 */
var alphas;
alphas = ["1", "2,", "3", "4"];
console.log(alphas[0]);
console.log(alphas[1]);
var nums = [1, 2, 3, 4];
console.log(nums[0]);
console.log(nums[1]);
console.log(nums[2]);
console.log(nums[3]);
// 아래 처럼 생성자를 통해 바로 선언 가능
var arr_name = new Array(4);
for (var i = 0; i < arr_name.length; i++) {
    arr_name[i] = i * 2;
    console.log(arr_name[i]);
}
var etc = [1, 2, 3, '4', 5];
console.log(etc);
var multi = [[1, 2, 3], [23, 24, 25]];
/**
 *
 * Array Destructuring
 *
 */
var arr = [12, 13];
var x = arr[0], y = arr[1];
console.log(x);
console.log(y);
var j;
var nums = [1001, 1002, 1003, 1004];
for (j in nums) {
    console.log(nums[j]);
}
// Tuple
var tup = [];
tup[0] = 12;
tup[1] = 12;
console.log(tup[0], tup[1]);

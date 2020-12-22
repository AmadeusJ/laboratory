package main

import "fmt"

func main() {
	fmt.Println("Hellow, World")

	// Variable Definition
	// -> go에서는 미사용에 대해서 경고 문구를 출력해준다.

	// var i, j, k int
	// var c, ch byte
	// var f, salary float32
	// j = 42

	var x float64
	x = 3.14159265358
	fmt.Println(x, "12")
	fmt.Printf("x is of type %T\n", x)
	fmt.Print(x, 12, 13, " +")

	/*
		Print : 단순히 괄호 안 내용 출력
		Println : 괄호안 내용을 출력한 후 마지막에 개행 문자가 포함됨(\n)
		Printf : 타입 변환자를 이용해 사용 가능
	*/

	// Mixed Variable Declaration
	var a, b, c = 3, 4, "foo"
	fmt.Println(a)
	fmt.Println(b)
	fmt.Println(c)
	fmt.Printf("a is of type %T\n", a)
	fmt.Printf("b is of type %T\n", b)
	fmt.Printf("c is of type %T\n", c)

	const LENGTH int = 10
	const WIDTH int = 5
	var area int
	area = LENGTH * WIDTH
	fmt.Printf("value of area : %d", area)
}

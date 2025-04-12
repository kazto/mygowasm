package main

import (
	"syscall/js"
)

// 純粋なGo言語の関数としてaddを実装
func add(a, b int) int {
	return a + b
}

// JavaScriptとのインターフェース関数
func jsAdd(this js.Value, args []js.Value) interface{} {
	if len(args) != 2 {
		return js.ValueOf("引数は2つ必要です")
	}

	// JavaScriptの値をGo言語の型に変換
	a := args[0].Int()
	b := args[1].Int()

	// 純粋なGo言語の関数を呼び出し
	result := add(a, b)

	// 結果をJavaScriptの値に変換して返す
	return js.ValueOf(result)
}

func main() {
	c := make(chan struct{}, 0)

	// JavaScriptインターフェース関数を公開
	js.Global().Set("goAdd", js.FuncOf(jsAdd))

	println("WASM Go Initialized")
	<-c
}
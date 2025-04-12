#!/bin/bash

# WASMにビルド
GOOS=js GOARCH=wasm go build -o dist/main.wasm main.go

# wasm_exec.jsをコピー（Goのインストールディレクトリから）
cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" dist/

echo "ビルド完了: dist/main.wasm"
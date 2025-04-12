# mygowasm

Go言語で実装された関数をWASMにビルドし、npmパッケージとして提供するプロジェクトです。

## 機能

- Go言語で実装された単純な `add` 関数をWASMとして提供
- TypeScriptの型定義付き
- ブラウザ環境で簡単に利用可能

## 必要条件

- Go 1.23.5以上
- Node.js 14以上
- npm 6以上

## インストール

```bash
npm install mygowasm
```

## 使い方

### ブラウザで使用する場合

```html
<!-- WASMを読み込むためのJavaScriptを読み込む -->
<script src="node_modules/mygowasm/dist/wasm_exec.js"></script>
<script type="module">
  import { loadWasm, add } from 'mygowasm';

  // WASMを読み込む
  await loadWasm('node_modules/mygowasm/dist/main.wasm');

  // add関数を使用する
  const result = add(5, 3);
  console.log(result); // 8
</script>
```

### TypeScriptで使用する場合

```typescript
import { loadWasm, add } from 'mygowasm';

async function main() {
  // WASMを読み込む
  await loadWasm('node_modules/mygowasm/dist/main.wasm');

  // add関数を使用する
  const result = add(5, 3);
  console.log(result); // 8
}

main().catch(console.error);
```

## 開発方法

### ビルド

```bash
# WASMをビルド
./build.sh

# TypeScriptをビルド
npm run build
```

### テスト

example/index.htmlをブラウザで開いて動作確認ができます。

```bash
# ビルド後、以下のコマンドでテスト用HTMLを開く
open example/index.html
```

## ライセンス

MIT
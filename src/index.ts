// WASMの型定義
declare global {
  interface Window {
    goAdd: (a: number, b: number) => number;
  }
}

// wasm_exec.jsを読み込む
export function loadWasmExec(): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'wasm_exec.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('wasm_exec.jsの読み込みに失敗しました'));
    document.head.appendChild(script);
  });
}

// WASMを読み込む
export async function loadWasm(wasmPath: string = 'main.wasm'): Promise<void> {
  // @ts-ignore
  if (!window.Go) {
    await loadWasmExec();
  }

  // @ts-ignore
  const go = new Go();

  try {
    const result = await WebAssembly.instantiateStreaming(
      fetch(wasmPath),
      go.importObject
    );

    go.run(result.instance);

    if (typeof window.goAdd !== 'function') {
      throw new Error('goAdd関数が見つかりません');
    }
  } catch (err) {
    console.error('WASMの読み込みに失敗しました:', err);
    throw err;
  }
}

// add関数のラッパー
export function add(a: number, b: number): number {
  if (typeof window.goAdd !== 'function') {
    throw new Error('WASMが読み込まれていません。先にloadWasm()を呼び出してください');
  }

  return window.goAdd(a, b);
}
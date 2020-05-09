---
title: '雑にシンタックスハイライトを実装'
date: '2020-05-08'
---

技術的なことも書いていくので、コードをハイライトする機能は必要だろう。

ということで実装していく。

## パッケージ選定
markdown のコンパイル時かコンパイル後にやるかだが、とりあえず体裁を整えたいだけで一旦あまり時間をかけずにやりたいので、コンパイラに組み込まずにいっそレンダリング後にやってしまえ。

[highlight.js](https://highlightjs.org/) がよさそう。
まずはインストール

```sh
$ yarn add highlight.js
$ yarn add -D @types/highlight.js
```

## 実装
今回のユースケースでは、 `<pre><code>` の node を `hljs.highlightBlock()` に渡すとよしなに className をつけてくれるので、それを利用して css でハイライトを整形する。そこで、

1. レンダリング後に副作用フックとrefフックで記事の node を取得
2. そこから `<pre><code>` を探して `highlight.js` に渡す

という流れでいく。

```typescript
const Post = ({ postData }: { postData: PostType }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    const contentNode = contentRef.current;
    if (contentNode) {
      const codeNodes = contentNode.querySelectorAll("pre");
      codeNodes.forEach((node: HTMLElement) => {
        hljs.highlightBlock(node);
      });
    }
  }, []);
  return (
    // 省略
    <div
      ref={contentRef}
      dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
    />
  );
};
```

あとは css を import すればOK。
面倒くさいので `pages/_app.tsx` でグローバルに読み込む。

```typescript
import React from "react";
import { AppProps } from "next/app";
import "highlight.js/styles/github.css"; // 追加

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
```

これでとりあえず最低限のシンタックスハイライトはできた。

```typescript
const hoge = 1 + 2
```

## 今後
- [ ] 1行のコードはインラインでもハイライトできるようにしたい
- [ ] ファイル名表示させたい
- [ ] jsx/tsx にも対応させたい

やっぱコンパイラに組み込むのがよさそうな気もしているので今度ちゃんと調べよう

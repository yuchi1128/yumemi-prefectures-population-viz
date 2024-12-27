# グラフで見る都道府県別人口推移

### 概要

- 株式会社ゆめみ コーディング試験で作成
- 都道府県別の総人口推移グラフを表示するSPA

### 使用技術

- Next.js(TypeScript)
- Tailwind CSS
- ESLint
- Prettier
- Highcharts
- ゆめみフロントエンドコーディング試験 API
- Cypress
- Vercel

### 起動

`npm install`  
`npm run dev`

### テスト

`npm run cypress:open`  

## フィードバック

### Good
- 独自にワイヤーフレームを解釈してデザイン・実装している
- API のエラーハンドリングができている
- データが存在しないときに専用の UI を用意している
- Lighthouse のスコアで高い評価となっている
- E2E Test を書いている
- Hooks を使っている
- API-key をアプリケーションコードから秘匿している
- コミットの粒度が適切である
- コミットのメッセージが適切である
- コミットに prefix がついている
- 比較的短時間（15時間以内）で完成している
- aria-labelが設定されており、アクセシビリティに対する配慮を行っている
- セレクトボックスの選択状況を色で視覚化されているなど、UIに対する工夫がなされている

### Next
- html 要素の lang が  ja でない
- 複雑なビジネスロジックがコンポーネントに存在している
- コンポーネント内部で API 呼び出しを直接行っている
- 環境変数についてのドキュメンテーションがない
- .env を使っているが、template がない
- 複雑なビジネスロジックについてコメントがない
- useEffectが乱用されており、ロジックに対する説明がないのでコードの責務・影響範囲を把握しづらい
- API通信が共通化されておらず、コンポーネントごとに散らばってしまっている
- E2Eテストは存在するが、コンポーネントごとの単体テストが用意されていない

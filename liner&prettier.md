ESLint&Prettier 2022/08/10
=====================


準備
----------------------------------------
Node.jsのインストール
インストール方法 ：https://miya-system-works.com/blog/detail/179
Node.js公式サイト：https://nodejs.org/en/

### Node.jsプロジェクト作成
```
$ npm init
```
実行するといくつか質問されます。すべて何も入力せずEnterで進めてください。


eslintのインストール
----------------------------------------
プロジェクト作成後、プロジェクトルートに移動し、以下コマンドを実行

### インストール

```
$ npm install -g eslint
$ eslint -v バージョン確認
```

test.js やらarobviewのjsファイルをディレクトリに持ってきて以下を実行。

```
$ eslint 対象ファイル
```
エラー内容がよくわからない場合は https://eslint.org/docs/latest/rules/ ルール一覧から検索。 問題なければ何も表示されない。

prettierのインストール
----------------------------------------

```
$ npm install prettier
```
.eslintrc.json をプロジェクトルートディレクトリに作成し、以下を追加。

{
    "extends": [
		//eslintの団体が推奨してるやつ
		"eslint:recommended",
		 "prettier"
	],
    "plugins": [],
    "parserOptions": {
        "ecmaVersion": 2015
    },
    "env": {
        "browser": true
    },
    "globals": {
	    //グローバル定義の変数や関数はこちらに記載して避ける。
        "$": "readonly",
        "Localize": "readonly",
        "sanitize": "readonly",
        "ShowDialog": "readonly",
        "mapItemMax": "readonly",
        "mapItemMin": "readonly",
        "ListItemUI": "readonly"
    },
    "rules": {
	      //コロンを必須に
        "semi": "error",
	      //バッティングを避ける
        "prettier/prettier": "error"
    }
}

VScode拡張機能のES Lint, Prettierを追加。
control + ,

setting.jsonに追加。
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.format.enable": false,
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "editor.lineNumbers": "on",
  "editor.rulers": [80],
  "editor.wordWrap": "on",
  "eslint.packageManager": "yarn",
  "files.insertFinalNewline": true,
  "files.trimTrailingWhitespace": true,
  "npm.packageManager": "yarn"
}

ESLintの拡張機能を入れた時点でエラーが赤く表示されるので、エラーを解消しつつ、
command＋Sで保存と同時にprettierの整形も実行。

https://zenn.dev/sawao/articles/6ad32596a82174


ESLintや Prettierを使うには必ずnode.jsが必要だが、node.jsで作られているプロダクトは現状少ない。
将来的に作り、そこに組み込むのははわかっているが、たたき台としては現在あるウェブアプリのフォーマット統一と、潜在的なエラーの解消に注力した方が良いのではという気がする。
既存プロジェクトのpush時に静的解析を組み込むには、nodejsを使う必要があり、難しくなっているため、
別でnode.jsプロジェクトを作成し、VScodeで簡単に取り入れられる拡張機能を利用し、
そこに既存アプリのjsファイルをコピペし、そこで修正とフォーマッタにかけて元のファイルと入れ替えるなどが即効性が高いとおもう。
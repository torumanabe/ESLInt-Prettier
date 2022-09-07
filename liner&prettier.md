ESLint&Prettier 2022/08/10
=====================


準備
----------------------------------------
Node.jsのインストール

#16.17.0 LTS

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
$ npm install eslint --save-dev
インストールできたか確認。
$ npx eslint -v
```

.eslintrc.json をプロジェクトルートディレクトリに作成し、以下を追加。

```
{
    "extends": [
		//eslintの団体が推奨しているもの
		  "eslint:recommended",
      //prettiernのルールとぶつからないようにするためのもの
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
	    //グローバル定義の変数や関数はこちらに記載して未定義エラーを避ける。
        "$": "readonly",
    },
    "rules": {
	      //コロンを必須に
        "semi": "error",
	      //prettierとのバッティングを避ける
        "prettier/prettier": "error"
    }
}
```

jsファイルを作成し、以下を実行。

```
$ eslint <対象ファイル>
```

セミコロンの付与など、軽微な修正を自動で行いたい場合は、
```
npx eslint <対象ファイル> --fix
```

エラー内容がよくわからない場合は https://eslint.org/docs/latest/rules/ ルール一覧から検索。
問題なければ何も表示されません。

VScode拡張機能のES Lintを入れることで、コマンド実行前に、エラーになってる箇所を風船マークで示してくれます。


prettierのインストール
----------------------------------------
PrettierとESLintのフォーマットルールがぶつからないようにするためのルールセット(config)も一緒に導入。
```
$ npm install --save-dev prettier eslint-config-prettier
```

### Prettier設定ファイルの作成

.prettier.jsonをプロジェクトルートに作成し、取り入れたいルールを記載していくことで、フォーマット時に反映される。 設定ファイルをチームで共有することで一貫性を保つことができる。

例
```
{
	"semi": true,
	"trailingComma": "all",
	"tabWidth": 4
}
```

実行コマンド
```
npx prettier --write test.js
```

VScode拡張機能のES Lint, Prettierを追加。
control + ,

コマンドパレットでformatを検索し、format Documentを選択。
configureから次に、Prettier - Code Formatterを選択。

### 保存時にフォーマットする

setting menu を開いて、Editor:Format On Save
にチェックを入れる。

### ESlintとPrettierのnpm-scripts設定

プロジェクト内のjsファイルに対して実行されるように設定します。

npm-run-allのインストール
```
npm install --save-dev npm-run-all
```
package.jsonのscriptsに以下を追記

```
"eslint": "eslint *.js",
"eslint:fix": "eslint *.js --fix",
"format": "prettier --write *.js",
"lint:fix": "npm-run-all eslint format"
```

それぞれnpm run eslint などで実行できる事を確認。
setting.jsonに追加。
```
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
```

ESLintの拡張機能を入れた時点でエラーが赤く表示されるので、エラーを解消しつつ、
command＋Sで保存と同時にprettierの整形も実行。

https://zenn.dev/sawao/articles/6ad32596a82174

### Git commit時に自動でlintを実行する(huskyとlint-staged)

```
npm install mrm lint-staged
```

下をpacheage.jsonに追加

```
 "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.js": "eslint --cache --fix",
    "*.{js,json}": "prettier --write"
  }
```

push時に行うにはpre-pushに下記を記載。
"pre-push": "lint-staged"



vueにおけるCROS対応
https://nkeke0.hatenablog.com/entry/2021/02/23/173434


https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Function/call

input type="file" を使わずにカッコよくファイルをアップ路度する方法。
https://qiita.com/nobu17/items/e2fcf12696d175bb369f
ESLint&Prettier 2022/09/23
=====================

準備
----------------------------------------
今回は練習用のNode.jsプロジェクトをリポジトリからpull。

eslintのインストール
----------------------------------------
プロジェクト作成後、プロジェクトルートに移動し、以下コマンドを実行

```
$ npm install eslint --save-dev
//インストールできたか確認。
$ npx eslint -v
```

.eslintrc.jsonの作成。
自分で書くより楽なので対話的に.eslintrc.jsonを作成します。
```
$ npx eslint --init
✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser, node
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · standard
✔ What format do you want your config file to be in? · JSON
Checking peerDependencies of eslint-config-standard@latest
The config that you've selected requires the following dependencies:

eslint-config-standard@latest eslint@^8.0.1 eslint-plugin-import@^2.25.2 eslint-plugin-n@^15.0.0 eslint-plugin-promise@^6.0.0
✔ Would you like to install them now? · No / Yes
✔ Which package manager do you want to use? · npm
```

.eslintrc.json が作成されるので、下のようになっていれば大丈夫です。

```{
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "standard"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
    }
}```

src/index.jsに対して以下を実行。
```$ eslint src/index.js```
セミコロンの付与など、軽微な修正を自動で行いたい場合は、
```npx eslint src/index.js --fix```
eslintはファイル１つ１つの内容しか見ないので、グローバル変数に対するエラーが起こることがあるのですが、その場合はファイルに直接
```/*globals $ */```
などとして教えてあげる事でエラーを避けることができます。
 .eslintrc.json内のgrobalsに書いてやる事でも回避できるので、調べて設定してみてください。

 エラー内容がよくわからない場合は https://eslint.org/docs/latest/rules/ ルール一覧から検索。問題なければ何も表示されません。

VScode拡張機能のESLintを入れることで、コマンド実行前に、エラー箇所を予め風船マークで示してくれます。

*vueに特化したルールを追加したい場合は
```
$ npm install --save-dev eslint-plugin-vue
```
を打った後、extendsに"vue"を追加。

prettierのインストール
----------------------------------------
PrettierとESLintのフォーマットルールがぶつからないようにするためのルールセット(config)も一緒に導入。eslintrcのrulesを無視してくれます。
```$ npm install --save-dev prettier eslint-config-prettier```

### Prettier設定
package.json に取り入れたいルールを記載することで、フォーマット時に反映されます。（.prettierrc.jsonを作ってそちらに書いても動きます。)
 特にルールを入れなくてもデフォルトのルールが機能するので折り入ってルールを追加するかも好みです。
 https://prettier.io/docs/en/options.html  こちらにオプション一覧があるので、下のルールを設定してみてください。

```
//例 tabの幅を4にしたい時（デフォルトは２）。
"prettier": {
	"tabWidth": 4
}
```

設定したいルール
・シングルクオートしか使えないようにしたい。ダブルクオート禁止。
・Bracket Spacingを作るようにしたい。 例 {foo: bar} ではなく { foo: bar }
・デフォルト80字だけど、１行40字にしたい。

実行コマンド
```npx prettier src/index.js --write```

VScode拡張機能のES Lint, Prettierを追加。
control + ,

コマンドパレットでformatを検索し、format Documentを選択。
configureから次に、Prettier - Code Formatterを選択。

### 保存時にフォーマットする

setting menu を開いて、
Editor:Format On Save
にチェックを入れる。

### ESlintとPrettierのnpm-scripts設定

npm-run-allのインストール
```npm install --save-dev npm-run-all```
package.jsonのscriptsに以下を追記

```"eslint": "eslint *.js",
"eslint:fix": "eslint src/*.js --fix",
"format": "prettier --write src/*.js",
"lint:fix": "npm-run-all eslint format"```

それぞれnpm run eslint などで実行できる事を確認。

### git commit時に自動でlintを実行する(huskyとlint-staged)

```npm install mrm lint-staged```

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
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

```
$ npm install eslint --save-dev
インストールできたか確認。
$ npx eslint -v
```
npx eslint --initコマンドで対話的にESLintを構成。

```
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

```
{
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
}
```

jsファイルを作成し、以下を実行。

```
$ eslint <対象ファイル>
```
グローバル変数に対するエラーが起こることがあるのですが、その場合はファイルに直接
/*globals $ */
として教えてあげる事でエラーを避けることができます。
.eslintrc.json内のgrobalsに書いてやる事でも回避できるので、調べて設定してみてください。


セミコロンの付与など、軽微な修正を自動で行いたい場合は、
```
npx eslint <対象ファイル> --fix
```

エラー内容がよくわからない場合は https://eslint.org/docs/latest/rules/ ルール一覧から検索。
問題なければ何も表示されません。

VScode拡張機能のESLintを入れることで、コマンド実行前に、エラー箇所を予め風船マークで示してくれます。

*vueに特化したルールを追加したい場合は
```
$ npm install --save-dev eslint-plugin-vue
```
prettierのインストール
----------------------------------------
PrettierとESLintのフォーマットルールがぶつからないようにするためのルールセット(config)も一緒に導入。eslintrcのrulesを無視してくれます。
```
$ npm install --save-dev prettier eslint-config-prettier
```

### Prettier設定

package.json に取り入れたいルールを記載することで、フォーマット時に反映される。
特にルールを入れなくてもデフォルトのルールが機能するのでルールを追加するかかも好み。
https://prettier.io/docs/en/options.html  こちらにオプション一覧があるので下のルールを設定してみてください。

例 tabの幅を4にしたい時（デフォルトは２）。

```
"prettier": {
	"tabWidth": 4
}
```

設定したいルール
・シングルクオートしか認めないようにしたい。ダブルクオート禁止。
・Bracket Spacingを作るようにしてみてください。 例 {foo: bar} ではなく { foo: bar }
・デフォルト80字だけど、１行40字にしたい。

実行コマンド
```
npx prettier --write test.js
```

VScode拡張機能のES Lint, Prettierを追加。
control + ,

コマンドパレットでformatを検索し、format Documentを選択。
configureから次に、Prettier - Code Formatterを選択。

### 保存時にフォーマットする

setting menu を開いて、
Editor:Format On Save
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
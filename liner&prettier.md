# ESLint&Prettier 2022/09/21

## 準備
今回は練習用のNode.js(16.17.0 LTS)プロジェクトをリポジトリからpull。
http://t_manabe@gitlab.aroba.jp/person_t_manabe/practice_eslint_prettier.git


## eslintのインストール
javascriptの静的解析ツールです。
----------------------------------------
プロジェクトルートに移動し、以下コマンドを実行

```
$ npm install eslint --save-dev
$ npx eslint -v
```

### .eslintrc.jsonの作成
1から書くより楽なので、eslint --initで対話的に.eslintrc.jsonを作成します。
```
$ npx eslint --init
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · browser, node
✔ What format do you want your config file to be in? · JSON
Checking peerDependencies of eslint-config-standard@latest
The config that you've selected requires the following dependencies:

eslint-plugin-import@^2.25.2 eslint-plugin-n@^15.0.0 eslint-plugin-promise@^6.0.0
✔ Would you like to install them now? · No / Yes
✔ Which package manager do you want to use? · npm
```

出来た.eslintrc.jsonに以下を追記してください。
```
"rules": {
  "semi":"error"
}
```
===========================================

src/index.jsに対して以下を実行。
```
npx eslint src/index.js
```
セミコロンの付与など、軽微な修正を自動で行いたい場合は、
```
npx eslint src/index.js --fix
```

エラー内容がよくわからない場合は、ルール一覧（ https://eslint.org/docs/latest/rules ）
から検索してください。
<br>問題なければコマンド実行後、何も表示されません。

※VScode 拡張機能の ESLint を入れると、コマンド実行前に、エラーになってる箇所を赤線で示してくれます。

===========================================

個別でルールを追加したい場合はrulesに記載します。<br>
・関数の定義を変数代入でしか行えないように、rulesに設定を追加してみてください。<br>(src/index.jsのhello関数に対してfunc-styleエラーが出るようにしてしてください。)

・また、ルールを無視させたい場合、下のようなコメントを1行上に書くことで回避できます。 <br>これを使って、上で設定したhello関数のエラーが消えるか試してください。
```
// eslint-disable-next-line func-style
```


vueに特化したルールを追加したい場合は
```
$ npm install --save-dev eslint-plugin-vue
```
を実行後、.eslintrc.jsonのextendsに"eslint:vue"を追加。
## prettier のインストール
javascriptのフォーマッタです。
PrettierとESLintのフォーマットルールがぶつからないようにするためのルールセット(config)も一緒に導入します。

```
$ npm install --save-dev prettier eslint-config-prettier
```

### Prettier 設定

package.json に取り入れたいルールを記載することで、フォーマット時に反映されます。（.prettierrc.jsonを作ってそれに書いても動きます。)

実行コマンド
```
npx prettier src/index.js --write
```
======================================

特にルールを入れなくてもデフォルトのルールが設定されているので、新たにルールを追加するかも好みです。
https://prettier.io/docs/en/options.html にオプション一覧があるので、 試しに下のルールを設定してみてください。<br>
例 tabの幅を4にしたい（デフォルトは２）。
```
"prettier": {
	"tabWidth": 4
}
```


設定したいルール
<br>・全てのクォートをシングルクオートにしたい。
<br>・デフォルト80字だが、１行40字にしたい。
<br>・引数が1つの場合は、アロー関数の括弧無しを認めたい。

======================================

## ESlint と Prettier の npm-scripts 設定

プロジェクト内の js ファイルに対して短いコマンド lint と prettier が実行されるように設定します。

package.json の scripts に以下を追記

```
"lint": "eslint src/*.js",
"lint:fix": "eslint src/*.js --fix",
"format": "prettier  src/*.js --write",
"lint:format": "eslint src/*.js --fix && prettier src/*.js --write",
```

それぞれ npm run lint などで実行できる事を確認してください。

======================================

## husky と lint-staged の導入
git commit時に自動で静的解析と整形を実行するためのツールを追加します。
以下のコマンドを実行すると .huskyフォルダが作られ、package.json に設定が追加されます。

```
npx mrm lint-staged
```

package.jsonのlint-stagedを修正します。
```
 "lint-staged": {
	"src/*.js": "npm run lint:format"
}
```
src/indx.js を戻して、git add & commit を実行し、静的解析と整形が自動実行されるか確認してください。

push前に静的解析と整形を行いたい場合、
```
npx husky add .husky/pre-push "npm run lint:format
```
を実行し、pre_commitを外して、pushを試してください。

vueにおけるCROS対応
https://nkeke0.hatenablog.com/entry/2021/02/23/173434


https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Function/call

input type="file" を使わずにカッコよくファイルをアップ路度する方法。
https://qiita.com/nobu17/items/e2fcf12696d175bb369f
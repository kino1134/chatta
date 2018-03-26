# chatta

簡易チャットアプリを題材として、SPA関連の勉強をしていきたい

## 勉強目的

### Node.jsのエコシステムを把握する  
とは言え、Webpackを０から設定するのは無理だったので、nuxt.jsを使用していきたい。

### SPAの考え方・作り方を把握する
vue, vue-router, vuexを対象とする。

### MongoDB, Redisの使い方を把握する。
永続データはMongoDB、認証情報などはRedisに収めるようにしてみたい。

### Dockerを使ってみる
少なくとも、MongoDBとRedisはコンテナで入れる。（インストールが面倒くさいから）

### WebSocketを使ってみる
socket.ioを使う。スケールのことを念頭に置いて、socket.io-redisも併用してみたい。

### 認証
Passportで普通のログイン画面〜GoogleのOAuth認証を行ったみたい

### ロギング
GitHubのスター数的にはwinstonか

### SCSSを使ってみる
CSSフレームワークとしてBulmaをnpm経由で入れてみた。  
また、各ページコンポーネントでもscssでスタイル設定してみる。  

### TypeScriptを使ってみる。
TypeScriptはとりあえず後回し。

### PaaSを使ってみる
デプロイもしてみたい。今のところ、こんな感じを考えている。

#### 静的ファイル
nuxt generateしたものをNetlifyに上げてみる
#### API・Socketサーバ
Herokuかnow.shかなぁ
#### 永続層
MongoDBは、mLabかAtlasで。  
RedisはHerokuのやつかRedis Labsのやつで。

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm start
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## Backpack

We use [backpack](https://github.com/palmerhq/backpack) to watch and build the application, so you can use the latest ES6 features (module syntax, async/await, etc.).

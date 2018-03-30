import express from 'express'
import http from 'http'
import socketIo from 'socket.io'
import redisAdapter from 'socket.io-redis'
import bodyParser from 'body-parser'
import { Nuxt, Builder } from 'nuxt'
import mongoose from 'mongoose'
import session from 'express-session'
import connectRedis from 'connect-redis'

import api from './api'
import socket from './socket'

const app = express()
const server = http.createServer(app)
const io = socketIo(server)
io.adapter(redisAdapter({ host: 'localhost', port: 6379 }))

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
app.set('port', port)

// セッション設定
const RedisStore = connectRedis(session)
app.use(session({
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    prefix: 'chatta.sess'
  }),
  secret: 'iw9XEPahkW9UjLsPyjnkvPZbNCqbcs22',
  resave: false,
  saveUninitialized: true,
  rolling: true,
  cookie: {
    httpOnly: false,
    maxAge: 14 * 24 * 3600 * 1000 // ２週間
  }
}))


// Make io accessible to our router
// TODO 正直、かなり危うい方法だと思う
// 本来、APIとソケットは別にするものなのだろう。
app.use(function(req, res, next) {
  req.io = io;
  next();
});

// JSONパーサの設定
app.use(bodyParser.json())
// Import API Routes
app.use('/api', api)

// MongoDBの設定
mongoose.connect('mongodb://localhost:27017', {
  user: 'admin',
  pass: 'pass1!',
  dbName: 'chatta'
})

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
server.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console

io.on('connect', socket)

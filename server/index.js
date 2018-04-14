import express from 'express'
import http from 'http'
import socketIo from 'socket.io'
import redisAdapter from 'socket.io-redis'
import bodyParser from 'body-parser'
import { Nuxt, Builder } from 'nuxt'
import mongoose from './mongoose'
import session from 'express-session'
import connectRedis from 'connect-redis'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import createLogger from './createLogger'

import api from './api'
import socket from './socket'
import User from './models/User'

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

io.adapter(redisAdapter({ host: process.env.REDIS_HOST || 'localhost', port: process.env.REDIS_PORT || 6379 }))

const host = process.env.WEB_HOST || '127.0.0.1'
const port = process.env.WEB_PORT || 3000
app.set('port', port)

// JSONパーサの設定
app.use(bodyParser.json())

// セッション設定
const RedisStore = connectRedis(session)
const sessionMiddleware = session({
  store: new RedisStore({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    prefix: 'chatta.sess'
  }),
  secret: process.env.EXPRESS_SESSION_SECRET || 'iw9XEPahkW9UjLsPyjnkvPZbNCqbcs22',
  resave: false,
  saveUninitialized: true,
  rolling: true,
  cookie: {
    httpOnly: false,
    // maxAge: 2 * 24 * 3600 * 1000 // ２日
    maxAge: 30 * 60 * 1000 // 10分
  }
})
app.use(sessionMiddleware)

// 認証の設定
const passportInit = passport.initialize()
const passportSession = passport.session()
app.use(passportInit)
app.use(passportSession)
passport.use(new LocalStrategy(
  { usernameField: 'user_id' },
  User.authenticate
))
passport.serializeUser(User.serializeUser)
passport.deserializeUser(User.deserializeUser)

const auth = function (req, res, next) {
  if (req.path === '/auth/local' || req.path === '/users' && req.method === 'POST') {
    next()
  } else {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.sendStatus(401)
    }
  }
}

// Make io accessible to our router
// TODO 正直、かなり危うい方法だと思う
// 本来、APIとソケットは別にするものなのだろう。
app.use(function(req, res, next) {
  req.io = io;
  next();
});

app.use(function (req, res, next) {
  const start = new Date()
  const logger = createLogger(req)
  logger.debug('[API][Request] "%s" "%s" "%s"', req.method, req.path, JSON.stringify(req.body))

  req.logger = logger

  const originalSend = res.send
  let logBody
  res.send = function (body) {
    originalSend.call(this, body)
    logBody = body
  }

  res.on('finish', () => {
    logger.debug('[API][Response] "%s" "%s" "%d", "%dms", "%s"', req.method, req.path, res.statusCode, new Date() - start, logBody)
  })

  mongoose.set('debug', function (coll, method, args) {
    logger.debug('[Mongo][Call] %s %s %s', coll, method, JSON.stringify(args))
  })

  next()
})

// Import API Routes
// ここまでにミドルウェアの設定(app.use)をすべて行う必要がある
app.use('/api', auth, api)

// MongoDBの設定
const mongoUrl = `mongodb://${ process.env.MONGO_HOST || 'localhost' }:${ process.env.MONGO_PORT || 27017 }`
mongoose.connect(mongoUrl, {
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

// express-session, passportの情報をsocket-ioでも見れるようにする
io.use(function (socket, next) {
  sessionMiddleware(socket.request, socket.request.res, function (req, res) {
    next()
  })
})
io.use(function (socket, next) {
  passportInit(socket.request, socket.request.res, function (req, res) {
    next()
  })
})
io.use(function (socket, next) {
  passportSession(socket.request, socket.request.res, function (req, res) {
    next()
  })
})
// ログの出力方法が分からないので、debugオプションをONにするだけ
// io.use(function (socket, next) {
//   const logger = createLogger(socket.request)
//   logger.debug('[Socket][Request]')

//   socket.request.logger = logger
//   socket.request.res.on('finish', () => {
//     logger.debug('[Socket][Response]')
//   })

//   next()
// })

io.on('connect', socket)

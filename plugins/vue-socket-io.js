import Vue from 'vue'
import client from 'socket.io-client'
import VueSocketio from 'vue-socket.io'
// import * as Cookies from 'tiny-cookie'

const socket = client('http://localhost:3000', {
  autoConnect: false
  // query: {
  //   'api.sid': Cookies.get('connect.sid')
  // }
})

socket.on('connect', () => {
  console.log(socket.id)
})
socket.on('ping', () => {
  console.log('ping')
})
socket.on('pong', () => {
  console.log('pong')
})
socket.on('disconnect', () => {
  console.log('disconnect')
})

Vue.use(VueSocketio, socket)

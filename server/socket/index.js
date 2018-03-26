export default (socket) => {
  console.log('a user connected')
  socket.on('test', (data) => {
    console.log(data)
  })
  socket.on('disconnect', () => {
    console.log('a user disconnected')
  })
}

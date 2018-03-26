<template>
  <div id="app">
    <div class="container is-fluid">
      <RoomList />
      <nuxt/>
    </div>
  </div>
</template>

<script>
import RoomList from '~/components/RoomList'
export default {
  components: {
    RoomList
  },
  mounted () {
    this.$socket.emit('test', 'hello')
  },
  sockets: {
    connect () {
      console.log('socket connected')
    },
    ping () {
      console.log('ping')
    },
    pong () {
      console.log('pong')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 100%;
  margin: 0;
}
</style>

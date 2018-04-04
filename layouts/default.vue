<template>
  <div id="app">
    <nuxt/>
  </div>
</template>

<script>
export default {
  middleware: [
    'checkAuth'
  ],
  mounted () {
    this.$socket.open()
    // 疎通確認
    this.$socket.emit('test', 'hello')
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

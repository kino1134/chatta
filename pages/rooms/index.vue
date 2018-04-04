<template>
  <div class="container is-fluid">
    <RoomList/>
    <div class="room">
      <RoomHeader/>
      <div class="messages">
        これはホーム画面です。
        <br>
        左のリストからチャンネルを選んでください
      </div>
    </div>
  </div>
</template>

<script>
import RoomList from '~/components/RoomList'
import RoomHeader from '~/components/RoomHeader'

export default {
  components: {
    RoomList,
    RoomHeader
  },
  head () {
    return {
      title: 'ホーム'
    }
  }
}
</script>

<style lang="scss" scoped>
.room {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  .messages {
    flex: 1 1 0;
    overflow-x: hidden;
    overflow-y: scroll;
    padding-left: 32px;
  }
}

@media(max-width: 779px) {
  .room {
    position: fixed;
    left: 0;
    width: 100%;
    height: 100%;
    transition: right 0.25s cubic-bezier(0.5, 0, 0.1, 1), transform 0.1s linear, -webkit-transform 0.1s linear;
  }
}
</style>

<template>
  <div class="container is-fluid">
    <RoomList />
    <div class="room">
      <header>
        ホーム
      </header>
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

export default {
  components: {
    RoomList
  },
  async asyncData () {
  },
  head () {
    return {
      title: 'ホーム'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/initial-variables";
@import "~bulma/sass/utilities/functions";
@import "~bulma/sass/utilities/derived-variables";

.container {
  display: flex;
  width: 100%;
  margin: 0;
}

.room {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  .messages {
    flex: 1 1 0;
    overflow-x: hidden;
    overflow-y: scroll;
  }
}
</style>

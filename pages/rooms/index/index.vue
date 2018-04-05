<template>
  <div>
    <RoomHeader :room-id="$route.params.id"/>
    <div class="messages">
      これはホーム画面です。
      <br>
      左のリストからチャンネルを選んでください
    </div>
  </div>
</template>

<script>
import RoomHeader from '~/components/RoomHeader'

export default {
  components: {
    RoomHeader
  }
}
</script>

<style lang="scss">
.messages {
  padding-left: 8px;
}
</style>


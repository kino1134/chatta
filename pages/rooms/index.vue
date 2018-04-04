<template>
  <div class="container is-fluid">
    <RoomList/>
    <div class="room">
      <RoomHeader :room-id="$route.params.id"/>
      <div class="messages">
        <nuxt-child :key="$route.params.id"/>
      </div>
      <PostArea :roomId="$route.params.id" />
    </div>
  </div>
</template>

<script>
import RoomList from '~/components/RoomList'
import RoomHeader from '~/components/RoomHeader'
import PostArea from '~/components/PostArea'

export default {
  components: {
    RoomList,
    RoomHeader,
    PostArea
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
    font-size: 14px;
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

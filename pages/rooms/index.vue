<template>
  <div class="container is-fluid" :class="{ 'show-sidebar': isShowSidebar }">
    <RoomList/>
    <div class="room">
      <header class="room-header">
        <a @click.stop="showSidebar" class="room-burger">
          <i class="fa fa-bars fa-lg"></i>
        </a>
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
  data () {
    return {
      isShowSidebar: false
    }
  },
  mounted () {
    this.$el.addEventListener('click', this.hideSidebar)
  },
  destroyed () {
    this.$el.removeEventListener('click', this.hideSidebar)
  },
  head () {
    return {
      title: 'ホーム'
    }
  },
  methods: {
    showSidebar () {
      this.isShowSidebar = true
    },
    hideSidebar () {
      this.isShowSidebar = false
    }
  }
}
</script>

<style lang="scss" scoped>
.room {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  .room-header {
    padding: 16px;
    display: flex;
    .room-burger {
      display: none;
      color: #444;
      padding: 0 1rem;
    }
  }
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
    .room-header {
      .room-burger {
        display: flex;
      }
    }
  }
}
</style>

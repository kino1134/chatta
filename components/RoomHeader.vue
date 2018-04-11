<template>
  <header class="room-header">
    <a @click.stop="toggleSidebar" class="room-burger">
      <i class="fa fa-bars fa-lg"></i>
    </a>
    <a @click="toggleFavorite" class="toggle-star tooltip is-tooltip-bottom"
      :class="{ on: isFavorite }" :data-tooltip="isFavorite ? 'お気に入りから外す' : 'お気に入りに追加'">
      <i class="fa-star fa-lg" :class="{ fa: isFavorite, far: !isFavorite }"></i>
    </a>
    <div class="room-info">
      {{ this.roomName }}
    </div>
    <div class="spacer"></div>
    <div class="room-action">
      <a ref="info" @click="toggleAction('info')" class="action-link tooltip is-tooltip-bottom" data-tooltip="ルーム情報">
        <i class="fa fa-info-circle fa-lg"></i>
      </a>
      <a ref="search" @click="toggleAction('search')" class="action-link tooltip is-tooltip-bottom" data-tooltip="メッセージ検索">
        <i class="fa fa-search fa-lg"></i>
      </a>
      <a ref="users" @click="toggleAction('users')" class="action-link tooltip is-tooltip-bottom" data-tooltip="所属ユーザ一覧">
        <i class="fa fa-users fa-lg"></i>
      </a>
      <a ref="invite" @click="toggleAction('invite')" class="action-link tooltip is-tooltip-bottom" data-tooltip="ユーザ招待">
        <i class="fa fa-user-plus fa-lg"></i>
      </a>
      <a class="action-link tooltip is-tooltip-bottom" data-tooltip="その他">
        <i class="fa fa-ellipsis-v fa-lg"></i>
      </a>
    </div>
  </header>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  props: {
    roomId: String
  },
  data () {
    return {
      roomName: 'ホーム'
    }
  },
  mounted () {
    if (this.roomId) {
      axios.get('/api/rooms/' + this.roomId).then((res) => {
        this.roomName = res.data.room_name || res.data.room_id
      })
    } else {
      this.roomName = 'ホーム'
    }

    this.actionClass()
  },
  head () {
    return {
      title: this.roomName
    }
  },
  computed: {
    isFavorite () {
      const favoriteList = this.$store.getters['user/loginUser'].room_list.filter((x) => x.favorite)
      return favoriteList.find((x) => x.room_id === this.roomId)
    }
  },
  watch: {
    '$route' (to, from) {
      this.actionClass()
    }
  },
  methods: {
    toggleFavorite () {
      this.$store.dispatch({
        type: 'user/toggleFavorite',
        roomId: this.roomId
      })
    },
    toggleSidebar () {
      const el = document.querySelector('.sidebar')
      el.classList.toggle('show')
    },
    toggleAction (action) {
      const prefix = 'rooms-index-id-'
      if (this.$router.currentRoute.name !== prefix + action) {
        this.$router.push(this.$router.currentRoute.path + '/' + action)
      } else {
        this.$router.go(-1)
      }
    },
    actionClass () {
      this.$refs.info.classList.remove('current')
      this.$refs.search.classList.remove('current')
      this.$refs.users.classList.remove('current')
      this.$refs.invite.classList.remove('current')
      const prefix = 'rooms-index-id-'
      if (this.$router.currentRoute.name === prefix + 'info') {
        this.$refs.info.classList.add('current')
      }
    }
  }
}
</script>

<style lang="scss">
.room-header {
  padding: 16px;
  display: flex;
  .room-burger {
    display: none;
    color: #444;
  }
  * {
    flex-shrink: 0;
  }
  .spacer {
    flex-grow: 1;
  }
  .toggle-star, .action-link {
    padding: 0 1rem;
    color: #cbced1;
  }
  .action-link:hover, .action-link.current {
    color: #23d160;
  }
  .toggle-star.on, .toggle-star:hover {
    color: #f6c502;
  }

  @media(max-width: 779px) {
    & {
      .room-burger {
        display: flex;
      }
    }
  }
}
</style>

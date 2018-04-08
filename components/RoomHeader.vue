<template>
  <header class="room-header">
    <a class="room-burger">
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
      <nuxt-link
        :to="{ name: 'rooms-index-id-info', params: { id: this.roomId } }"
        class="action-link tooltip is-tooltip-bottom" data-tooltip="ルーム情報">
        <i class="fa fa-info-circle fa-lg"></i>
      </nuxt-link>
      <a class="action-link tooltip is-tooltip-bottom" data-tooltip="メッセージ検索"><i class="fa fa-search fa-lg"></i></a>
      <a class="action-link tooltip is-tooltip-bottom" data-tooltip="所属ユーザ一覧"><i class="fa fa-users fa-lg"></i></a>
      <a class="action-link tooltip is-tooltip-bottom" data-tooltip="ユーザ招待"><i class="fa fa-user-plus fa-lg"></i></a>
      <a class="action-link tooltip is-tooltip-bottom" data-tooltip="その他"><i class="fa fa-ellipsis-v fa-lg"></i></a>
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
  methods: {
    toggleFavorite () {
      this.$store.dispatch({
        type: 'user/toggleFavorite',
        roomId: this.roomId
      })
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
  .action-link:hover {
    color: #1d74f5;
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

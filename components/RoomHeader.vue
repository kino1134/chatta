<template>
  <header class="room-header">
    <a class="room-burger">
      <i class="fa fa-bars fa-lg"></i>
    </a>
    <a class="toggle-star" :class="{ on: isFavorite }"><i class="fa-star fa-lg" :class="{ fa: isFavorite, far: !isFavorite }"></i></a>
    <div class="room-info">
      {{ this.roomName }}
    </div>
    <div class="spacer"></div>
    <div class="room-action">
      <a class="action-link tooltip is-tooltip-bottom" data-tooltip="ルーム情報"><i class="fa fa-info-circle fa-lg"></i></a>
      <a class="action-link"><i class="fa fa-search fa-lg"></i></a>
      <a class="action-link"><i class="fa fa-users fa-lg"></i></a>
      <a class="action-link"><i class="fa fa-user-plus fa-lg"></i></a>
      <a class="action-link"><i class="fa fa-ellipsis-v fa-lg"></i></a>
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
      roomName: 'ホーム',
      isFavorite: false
    }
  },
  watch: {
    roomId (val, oldVal) {
      if (val) {
        axios.get('/api/rooms/' + val).then((res) => {
          this.roomName = res.data.name
        })
      } else {
        this.roomName = 'ホーム'
      }
    }
  },
  head () {
    return {
      title: this.roomName
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

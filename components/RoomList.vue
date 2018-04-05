<template>
  <aside class="sidebar menu">
    <header class="login-user">
      <div class="dropdown menu-list" :class="{ 'is-active': this.isVisibleAccountMenu }">
        <a class="dropdown-trigger menu-item" @click.stop="toggleVisibleAccountMenu" aria-haspopup="true" aria-controls="account-menu">
          <span class="name">
            {{ $store.getters['user/loginUser'].user_name }}
          </span>
          <i class="fas fa-ellipsis-v fa-sm"></i>
        </a>
        <div id="account-menu" class="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <a href="#" class="dropdown-item">
              Dropdown item
            </a>
            <a class="dropdown-item">
              Other dropdown item
            </a>
            <a href="#" class="dropdown-item is-active">
              Active dropdown item
            </a>
            <a href="#" class="dropdown-item">
              <i class="far fa-user"></i>
              アカウント設定
            </a>
            <hr class="dropdown-divider">
            <a @click="logout"  class="dropdown-item">
              <i class="fa fa-sign-out-alt"></i>
              ログアウト
            </a>
          </div>
        </div>
      </div>
      <div class="field is-grouped">
        <p class="control has-icons-left search-box">
          <input class="input" type="text">
          <span class="icon is-left">
            <i class="fas fa-search"></i>
          </span>
        </p>
        <p class="control">
        <nuxt-link :to="{ name: 'rooms-index-create' }" class="button is-success">
            <i class="fas fa-plus"></i>
          </nuxt-link>
        </p>
      </div>
    </header>
    <div class="room-list">
      <template v-if="favorites && favorites.length > 0">
        <p class="menu-label">
          お気に入り
        </p>
        <ul class="menu-list">
          <li v-for="(favorite, index) in favorites" :key="index">
            <nuxt-link :to="{ name: 'rooms-index-id', params: { id: favorite.room_id } }" class="menu-item">{{ favorite.name }}</nuxt-link>
          </li>
        </ul>
      </template>
      <template v-if="channels && channels.length > 0">
        <p class="menu-label">
          チャンネル
        </p>
        <ul class="menu-list">
          <li v-for="(channel, index) in channels" :key="index">
            <nuxt-link :to="{ name: 'rooms-index-id', params: { id: channel.room_id } }" class="menu-item">{{ channel.name }}</nuxt-link>
          </li>
        </ul>
      </template>
      <template v-if="groups && groups.length > 0">
        <p class="menu-label">
          グループ
        </p>
        <ul class="menu-list">
          <li v-for="(group, index) in groups" :key="index">
            <nuxt-link :to="{ name: 'rooms-index-id', params: { id: group.room_id } }" class="menu-item">{{ group.name }}</nuxt-link>
          </li>
        </ul>
      </template>
      <template v-if="directs && directs.length > 0">
        <p class="menu-label">
          ダイレクトメッセージ
        </p>
        <ul class="menu-list">
          <li v-for="(direct, index) in directs" :key="index">
            <nuxt-link :to="{ name: 'rooms-index-id', params: { id: direct.room_id } }" class="menu-item">{{ direct.name }}</nuxt-link>
          </li>
        </ul>
      </template>
    </div>
  </aside>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  data () {
    return {
      isVisibleAccountMenu: false,
      favorites: [],
      channels: [],
      groups: [],
      directs: []
    }
  },
  created () {
    document.addEventListener('click', this.hideAccountMenu)
    axios.get('/api/rooms').then((res) => {
      const rooms = res.data
      this.favorites = rooms.filter(x => x.type === 'favorite')
      this.channels = rooms.filter(x => x.type === 'public')
      this.groups = rooms.filter(x => x.type === 'private')
      this.directs = rooms.filter(x => x.type === 'direct')
    })
  },
  destroyed () {
    document.removeEventListener('click', this.hideAccountMenu)
  },
  methods: {
    toggleVisibleAccountMenu () {
      this.isVisibleAccountMenu = !this.isVisibleAccountMenu
    },
    hideAccountMenu () {
      this.isVisibleAccountMenu = false
    },
    async logout () {
      await axios.post('/api/logout').then((res) => {
        this.$socket.close()
        this.$router.push('/signIn')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$sidebar-width: 280px;

@media(max-width: 779px) {
  .sidebar {
    transform: translate3d($sidebar-width * -1, 0, 0);
    z-index: 2;
  }
  .show-sidebar .sidebar {
    transform: translate3d(0, 0, 0);
  }
}

.sidebar {
  flex: 0 0 $sidebar-width;
  background-color: #abcdef;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.3s;

  .login-user {
    font-size: 1.2em;
    .name {
      display: inline-block;
      width: $sidebar-width - 48px;
    }
    #account-menu {
      left: 24px;
    }
    .field {
      padding: 4px 12px;
      .search-box {
        flex-shrink: 1;
      }
    }
  }

  .room-list {
    overflow-x: hidden;
    overflow-y: scroll;
    flex: 1 1 0;
    .menu-label {
      padding: 0 24px;
    }
  }

  .menu-list {
    .menu-item {
      padding-left: 24px;
      padding-right: 24px;
      width: $sidebar-width;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>

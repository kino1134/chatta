<template>
  <aside class="sidebar menu">
    <header class="login-user">
      <div class="dropdown" :class="{ 'is-active': this.isVisibleAccountMenu }">
        <div class="dropdown-trigger">
          <a @click="toggleVisibleAccountMenu" class="button" aria-haspopup="true" aria-controls="account-menu">
            {{ $store.getters['user/loginUser'].user_name }}
          </a>
        </div>
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
              Other dropdown item
            </a>
            <hr class="dropdown-divider">
            <a @click="logout"  class="dropdown-item">
              ログアウト
            </a>
          </div>
        </div>
      </div>
    </header>
    <div class="room-list">
      <template v-if="favorites && favorites.length > 0">
        <p class="menu-label">
          お気に入り
        </p>
        <ul class="menu-list">
          <li v-for="(favorite, index) in favorites" :key="index">
            <nuxt-link :to="{ name: 'rooms-id', params: { id: favorite.room_id } }">{{ favorite.name }}</nuxt-link>
          </li>
        </ul>
      </template>
      <template v-if="channels && channels.length > 0">
        <p class="menu-label">
          チャンネル
        </p>
        <ul class="menu-list">
          <li v-for="(channel, index) in channels" :key="index">
            <nuxt-link :to="{ name: 'rooms-id', params: { id: channel.room_id } }">{{ channel.name }}</nuxt-link>
          </li>
        </ul>
      </template>
      <template v-if="groups && groups.length > 0">
        <p class="menu-label">
          グループ
        </p>
        <ul class="menu-list">
          <li v-for="(group, index) in groups" :key="index">
            <nuxt-link :to="{ name: 'rooms-id', params: { id: group.room_id } }">{{ group.name }}</nuxt-link>
          </li>
        </ul>
      </template>
      <template v-if="directs && directs.length > 0">
        <p class="menu-label">
          ダイレクトメッセージ
        </p>
        <ul class="menu-list">
          <li v-for="(direct, index) in directs" :key="index">
            <nuxt-link :to="{ name: 'rooms-id', params: { id: direct.room_id } }">{{ direct.name }}</nuxt-link>
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
    axios.get('/api/rooms').then((res) => {
      const rooms = res.data
      this.favorites = rooms.filter(x => x.type === 'favorite')
      this.channels = rooms.filter(x => x.type === 'public')
      this.groups = rooms.filter(x => x.type === 'private')
      this.directs = rooms.filter(x => x.type === 'direct')
    })
  },
  methods: {
    toggleVisibleAccountMenu () {
      this.isVisibleAccountMenu = !this.isVisibleAccountMenu
    },
    async logout () {
      await axios.post('/api/logout').then((res) => {
        this.$router.push('/signIn')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$sidebar-width: 220px;

.sidebar {
  flex: 0 0 $sidebar-width;
  background-color: #abcdef;
  display: flex;
  flex-direction: column;
  height: 100%;

  .login-user {
    font-size: 1.2em;
    margin: 8px 16px;
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
    a {
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

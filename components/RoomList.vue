<template>
  <aside class="sidebar menu">
    <header>
      ろぐいんゆーざ
    </header>
    <div class="room-list">
      <template v-if="favorites && favorites.length > 0">
        <p class="menu-label">
          お気に入り
        </p>
        <ul class="menu-list">
          <li v-for="(favorite, index) in favorites" :key="index">
            <a href="#">{{ favorite.name }}</a>
          </li>
        </ul>
      </template>
      <template v-if="channels && channels.length > 0">
        <p class="menu-label">
          チャンネル
        </p>
        <ul class="menu-list">
          <li v-for="(channel, index) in channels" :key="index">
            <a href="#">{{ channel.name }}</a>
          </li>
        </ul>
      </template>
      <template v-if="groups && groups.length > 0">
        <p class="menu-label">
          グループ
        </p>
        <ul class="menu-list">
          <li v-for="(group, index) in groups" :key="index">
            <a href="#">{{ group.name }}</a>
          </li>
        </ul>
      </template>
      <template v-if="directs && directs.length > 0">
        <p class="menu-label">
          ダイレクトメッセージ
        </p>
        <ul class="menu-list">
          <li v-for="(direct, index) in directs" :key="index">
            <a href="#">{{ direct.name }}</a>
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
}

.room-list{
  overflow-x: hidden;
  overflow-y: scroll;
  flex: 1 1 0;
  .menu-label {
    padding: 0 24px;
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

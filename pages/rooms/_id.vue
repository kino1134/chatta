<template>
  <div class="container is-fluid" :class="{ 'show-sidebar': isShowSidebar }">
    <RoomList/>
    <div class="room">
      <header class="room-header">
        <a @click.stop="showSidebar" class="room-burger">
          <i class="fa fa-bars fa-lg"></i>
        </a>
        <a class="toggle-star" :class="{ on: isFavorite }"><i class="fa-star fa-lg" :class="{ fa: isFavorite, far: !isFavorite }"></i></a>
        <div class="room-info">
          {{ room.name }}
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
      <div class="messages">
        <article v-for="(message, index) in messages" class="media">
          <figure class="media-left">
            <p class="image avator"><img src="https://bulma.io/images/placeholders/128x128.png"></p>
          </figure>
          <div class="media-content">
            <div class="content">
              <p>
                <span class="message-info">
                  <strong>{{ message.user_name }}</strong>
                  <small>{{ message.user_id }}</small>
                  <small>{{ message.posted | moment('LLLL')  }}</small>
                </span>
                <br>
                <span v-html="markdown(message.body)"></span>
              </p>
            </div>
          </div>
        </article>
      </div>
      <PostArea :roomId="room.room_id" />
    </div>
  </div>
</template>

<script>
import marked from 'marked'
import axios from '~/plugins/axios'
import RoomList from '~/components/RoomList'
import PostArea from '~/components/PostArea'

export default {
  async asyncData ({ params }) {
    let { data: messages } = await axios.get('/api/messages/' + params.id)
    let { data: room } = await axios.get('/api/rooms/' + params.id)
    return {
      room: room,
      isFavorite: false,
      isShowSidebar: false,
      messages: messages
    }
  },
  components: {
    RoomList,
    PostArea
  },
  head () {
    return {
      title: this.room.name
    }
  },
  mounted () {
    this.$el.addEventListener('click', this.hideSidebar)
    this.$nextTick(this.scrollLast)
  },
  destroyed () {
    this.$el.removeEventListener('click', this.hideSidebar)
  },
  sockets: {
    posted (message) {
      this.messages.push(message)
      this.$nextTick(this.scrollLast)
    }
  },
  methods: {
    markdown (value) {
      return marked(value, {
        sanitize: true,
        gfm: true,
        breaks: true
      })
    },
    scrollLast () {
      const container = this.$el.querySelector('.messages')
      container.scrollTop = container.scrollHeight
    },
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
@import "~bulma/sass/utilities/initial-variables";
@import "~bulma/sass/utilities/functions";
@import "~bulma/sass/utilities/derived-variables";

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
  }
  .messages {
    flex: 1 1 0;
    overflow-x: hidden;
    overflow-y: scroll;
    font-size: 14px;
  }
  .media {
    padding: 8px 50px 4px 20px;
    .avator {
      width: 36px;
      height: 36px;
    }
    &:hover {
      background-color: $background;
    }
    & + .media {
      margin-top: 0;
      padding-top: 8px;
      border-top: none;
    }
  }
  .message-info > * {
    margin-right: 5px;
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

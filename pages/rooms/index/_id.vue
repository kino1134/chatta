<template>
  <div>
    <RoomHeader :room-id="$route.params.id"/>
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
    <PostArea :roomId="$route.params.id" />
  </div>
</template>

<script>
import marked from 'marked'
import axios from '~/plugins/axios'
import RoomHeader from '~/components/RoomHeader'
import PostArea from '~/components/PostArea'

export default {
  components: {
    RoomHeader,
    PostArea
  },
  async asyncData ({ params }) {
    let { data: messages } = await axios.get('/api/messages/' + params.id)
    return {
      messages: messages
    }
  },
  sockets: {
    posted (message) {
      this.messages.push(message)
      this.$nextTick(this.scrollLast)
    }
  },
  mounted () {
    this.$nextTick(this.scrollLast)
  },
  methods: {
    scrollLast () {
      const container = document.querySelector('.messages')
      container.scrollTop = container.scrollHeight
    },
    markdown (value) {
      return marked(value, {
        sanitize: true,
        gfm: true,
        breaks: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/initial-variables";
@import "~bulma/sass/utilities/functions";
@import "~bulma/sass/utilities/derived-variables";

.messages {
  flex: 1 1 0;
  overflow-x: hidden;
  overflow-y: scroll;
  font-size: 14px;

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
</style>

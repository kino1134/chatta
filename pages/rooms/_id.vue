<template>
  <div class="room">
    <header>
      {{ room.name }}
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
    <PostArea />
  </div>
</template>

<script>
import marked from 'marked'
import axios from '~/plugins/axios'
import PostArea from '~/components/PostArea'

export default {
  async asyncData ({ params }) {
    let { data: messages } = await axios.get('/api/messages')
    let { data: room } = await axios.get('/api/rooms/' + params.id)
    return {
      room: room,
      messages: messages
    }
  },
  components: {
    PostArea
  },
  head () {
    return {
      title: this.room.name
    }
  },
  methods: {
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
  font-size: 14px;
}

.room {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  .messages {
    /* padding: 50px 50px 0; */
    flex: 1 1 0;
    overflow-x: hidden;
    overflow-y: scroll;
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
</style>

<template>
  <div class="container is-fluid">
    <RoomList />
    <div class="room">
      <header>
        るーむめい
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
      <footer>
        <div class="field has-addons">
          <p class="control">
            <a class="button">
              +
            </a>
          </p>
          <p class="control">
            <a class="button">
              <i class="fas fa-at"></i>
            </a>
          </p>
          <p class="control">
            <a class="button">
              <i class="far fa-meh"></i>
            </a>
          </p>
          <p class="control main">
            <textarea v-model="inputMessage" class="textarea is-radiusless" :rows="rows" placeholder="メッセージ"></textarea>
          </p>
          <p class="control">
            <a class="button is-primary" :disabled="notInput">
              <i class="fas fa-comment-alt fa-lg"></i>
            </a>
          </p>
        </div>
      </footer>
    </div>
  </div>
  <!--     <li v-for="(user, index) in users" :key="index" class="user"> -->
  <!--       <nuxt-link :to="{ name: 'id', params: { id: index }}"> -->
  <!--         {{ user.name }} -->
  <!--       </nuxt-link> -->
  <!--     </li> -->
</template>

<script>
import axios from '~/plugins/axios'
import marked from 'marked'
import RoomList from '~/components/RoomList'

export default {
  components: {
    RoomList
  },
  computed: {
    rows () {
      const num = this.inputMessage.split('\n').length
      if (num < 1) {
        return 1
      } else if (num >= 5) {
        return 5
      } else {
        return num
      }
    },
    notInput () {
      return !/\S/.test(this.inputMessage)
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
  },
  async asyncData () {
    let { data: messages } = await axios.get('/api/messages')

    return {
      messages: messages,
      inputMessage: ''
    }
  },
  head () {
    return {
      title: 'Users'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/initial-variables";
@import "~bulma/sass/utilities/functions";
@import "~bulma/sass/utilities/derived-variables";

.container {
  display: flex;
  width: 100%;
  margin: 0;
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
  footer {
    padding: 24px;
    .has-addons {
      .button {
        height: 100%;
      }
      .control.main {
        flex: 1 1 auto;
      }
    }
    .textarea {
      resize: none;
      &:focus, &:hover {
        border-color: $border;
        box-shadow: unset;
      }
    }
  }
}
</style>

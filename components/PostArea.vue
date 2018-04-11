<template>
  <footer class="post-area">
    <div class="field has-addons">
      <p class="control">
      <a class="button">
        <i class="fas fa-plus"></i>
      </a>
      </p>
      <p class="control">
      <a class="button">
        <i class="fas fa-at"></i>
      </a>
      </p>
      <p class="control">
      <a class="button">
        <i class="far fa-smile"></i>
      </a>
      </p>
      <p class="control main">
      <textarea v-model="inputMessage" class="textarea is-radiusless" :rows="rows" placeholder="メッセージ" @keydown.shift.enter.prevent="sendPost"></textarea>
      </p>
      <p class="control">
      <button class="button is-success" v-on:click="sendPost" :disabled="notInput">
        <i class="fas fa-comment-dots fa-lg"></i>
      </button>
      </p>
    </div>
  </footer>
</template>

<script>
import axios from '~/plugins/axios'

const store = {}
export default {
  data () {
    return { inputMessage: '' }
  },
  props: [
    'roomId'
  ],
  created () {
    if (store[this.roomId]) {
      this.inputMessage = store[this.roomId]
    }
  },
  watch: {
    inputMessage (val, old) {
      store[this.roomId] = val
    }
  },
  methods: {
    sendPost () {
      axios.post('/api/messages', {
        room_id: this.roomId,
        body: this.inputMessage
      }).then((res) => { this.inputMessage = '' })
    }
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
  }
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/initial-variables";
@import "~bulma/sass/utilities/functions";
@import "~bulma/sass/utilities/derived-variables";

.post-area {
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
</style>

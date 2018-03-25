<template>
  <footer class="post-area">
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
</template>

<script>
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

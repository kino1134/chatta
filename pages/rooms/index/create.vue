<template>
  <section>
    <div class="container">
      <div class="column is-8 is-offset-2">
        <h2 class="title">
          新しいルームを作成します
        </h2>
        <div class="field">
          <div class="control">
            <label class="label">
              ルームID
            </label>
            <input class="input" type="text">
            <p class="help">
              何かしらの制約を付ける予定です。
            </p>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="label">
              説明
            </label>
            <input class="input" type="text">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <a class="button is-primary is-large" tabindex="0">作成</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  transition: {
    name: 'fade'
  },
  head () {
    return {
      title: '新規ルーム作成'
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 60px;
  flex: 1 0 auto;
}

.fade-enter {
    opacity: 0;
}
.fade-enter-active {
    transition: opacity .5s
}
</style>

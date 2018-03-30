<template>
  <div class="column is-6 is-offset-3">
    <h3 class="title has-text-grey has-text-centered">ユーザ登録</h3>
    <div class="box">
      <form action="">
        <div class="field">
          <div class="control has-icons-left">
            <input class="input is-large" type="text" placeholder="E-Mail" autofocus="">
            <span class="icon is-large is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <div class="control has-icons-left">
            <input class="input is-large" type="text" placeholder="ID">
            <span class="icon is-large is-left">
              <i class="fas fa-at"></i>
            </span>
          </div>
          <p class="help">※英字・数字・アンダーバー(_)のみ使用出来ます。</p>
        </div>
        <div class="field">
          <div class="control has-icons-left">
            <input class="input is-large" type="text" placeholder="Nick Name">
            <span class="icon is-large is-left">
              <i class="fas fa-user"></i>
            </span>
          </div>
          <p class="help">※空欄の場合、IDの表記が使用されます。</p>
        </div>
        <div class="field">
          <div class="control has-icons-left">
            <input class="input is-large" type="password" placeholder="Password">
            <span class="icon is-large is-left">
              <i class="fas fa-key"></i>
            </span>
          </div>
          <p class="help">英小・大文字、数字の組み合わせで８文字以上</p>
        </div>
        <div class="field">
          <div class="control has-icons-left">
            <input class="input is-large" type="password" placeholder="Confirm Password">
            <span class="icon is-large is-left">
              <i class="fas fa-key"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <div class="control has-text-centered">
            <button class="button is-primary is-large">Sign Up</button>
          </div>
        </div>
      </form>
    </div>
    <p class="has-text-grey has-text-centered">
      <nuxt-link :to="{ name: 'signIn' }">戻る</nuxt-link>
    </p>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  head () {
    return {
      title: 'ユーザ登録'
    }
  }
}
</script>

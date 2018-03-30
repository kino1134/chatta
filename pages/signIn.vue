<template>
  <div class="column is-6 is-offset-3">
    <h3 class="title has-text-grey has-text-centered">Login</h3>
    <div class="box">
      <form action="">
        <div class="field">
          <div class="control has-icons-left">
            <input class="input is-large" type="text" placeholder="ID" autofocus="">
            <span class="icon is-large is-left">
              <i class="fas fa-at"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <div class="control has-icons-left">
            <input class="input is-large" type="password" placeholder="Password">
            <span class="icon is-large is-left">
              <i class="fas fa-key"></i>
            </span>
          </div>
        </div>
        <button class="button is-block is-primary is-large is-fullwidth">Login</button>
      </form>
    </div>
    <p class="has-text-grey has-text-centered">
      <nuxt-link :to="{ name: 'signUp' }">ユーザ登録</nuxt-link>&nbsp; /&nbsp;
      <a href="../">パスワードを忘れた？</a>
    </p>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  head () {
    return {
      title: 'サインイン'
    }
  }
}
</script>

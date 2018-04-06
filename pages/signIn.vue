<template>
  <div class="column is-4 is-offset-4">
    <h3 class="title has-text-grey has-text-centered">Login</h3>
    <div class="box">
      <div class="field">
        <div class="control has-icons-left">
          <input v-model="user_id" class="input is-large" type="text" placeholder="ID" autofocus="">
          <span class="icon is-large is-left">
            <i class="fas fa-at"></i>
          </span>
        </div>
      </div>
      <div class="field">
        <div class="control has-icons-left">
          <input v-model="password" class="input is-large" type="password" placeholder="Password" @keydown.enter="signIn">
          <span class="icon is-large is-left">
            <i class="fas fa-key"></i>
          </span>
        </div>
      </div>
      <div class="field">
        <div class="control has-text-centered">
          <button @click="signIn" class="button is-primary is-large" tabindex="0">ログイン</button>
        </div>
      </div>
    </div>
    <p class="has-text-grey has-text-centered">
      <nuxt-link :to="{ name: 'signUp' }">ユーザ登録</nuxt-link>&nbsp; /&nbsp;
      <a href="../">パスワードを忘れた？</a>
    </p>
  </div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  layout: 'auth',
  data () {
    return {
      user_id: '',
      password: ''
    }
  },
  head () {
    return {
      title: 'サインイン'
    }
  },
  methods: {
    signIn () {
      axios.post('/api/auth/local', {
        user_id: this.user_id,
        password: this.password
      }).then((res) => {
        this.$store.commit({
          type: 'user/setUser',
          user: res.data
        })
        this.$router.push('/')
      })
    }
  }
}
</script>

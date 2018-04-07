<template>
  <div class="column is-4 is-offset-4">
    <h3 class="title has-text-grey has-text-centered">Login</h3>
    <div class="box">
      <TopErrorMessage :errors="errors"/>
      <div class="field">
        <div class="control has-icons-left">
          <input v-model="user_id" class="input is-large" :class="errors.class('user_id')" type="text" placeholder="ID" autofocus="">
          <InputErrorMessage :msg="errors.msg('user_id')"/>
          <span class="icon is-large is-left">
            <i class="fas fa-at"></i>
          </span>
        </div>
      </div>
      <div class="field">
        <div class="control has-icons-left">
          <input v-model="password" class="input is-large" :class="errors.class('password')" type="password" placeholder="Password" @keydown.enter="signIn">
          <InputErrorMessage :msg="errors.msg('password')"/>
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
import { preventDoubleSubmission } from '~/utils/form'
import ErrorJson from '~/utils/ErrorJson'
import TopErrorMessage from '~/components/TopErrorMessage'
import InputErrorMessage from '~/components/InputErrorMessage'

export default {
  layout: 'auth',
  components: {
    TopErrorMessage,
    InputErrorMessage
  },
  data () {
    return {
      user_id: '',
      password: '',
      errors: new ErrorJson()
    }
  },
  head () {
    return {
      title: 'サインイン'
    }
  },
  methods: {
    signIn: preventDoubleSubmission(async function () {
      this.errors = new ErrorJson()
      let res = await axios.post('/api/auth/local', {
        user_id: this.user_id,
        password: this.password
      }).catch((err) => {
        if (err.response.status === 401) {
          this.errors = new ErrorJson('認証に失敗しました。')
        } else {
          this.errors = new ErrorJson(err.response.data)
        }
      })

      if (res.status === 200) {
        this.$store.commit({
          type: 'user/setUser',
          user: res.data
        })
        this.$router.push('/')
      }
    })
  }
}
</script>

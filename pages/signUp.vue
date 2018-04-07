<template>
  <div class="column is-6 is-offset-3">
    <h3 class="title has-text-grey has-text-centered">ユーザ登録</h3>
    <div class="box">
      <TopErrorMessage :errors="errors"/>
      <div class="field">
        <div class="control has-icons-left">
          <input v-model="e_mail" class="input is-large" :class="errors.class('e_mail')" @blur="completionId" type="text" placeholder="E-Mail" autofocus="">
          <InputErrorMessage :msg="errors.msg('e_mail')"/>
          <span class="icon is-large is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </div>
      </div>
      <div class="field">
        <div class="control has-icons-left">
          <input v-model="user_id" class="input is-large" :class="errors.class('user_id')" type="text" placeholder="ID">
          <InputErrorMessage :msg="errors.msg('user_id')"/>
          <span class="icon is-large is-left">
            <i class="fas fa-at"></i>
          </span>
        </div>
        <p class="help">※英数字・一部の記号(_.-)のみ使用出来ます。</p>
      </div>
      <div class="field">
        <div class="control has-icons-left">
          <input v-model="user_name" class="input is-large" :class="errors.class('user_name')" type="text" placeholder="Nick Name">
          <InputErrorMessage :msg="errors.msg('user_name')"/>
          <span class="icon is-large is-left">
            <i class="fas fa-user"></i>
          </span>
        </div>
        <p class="help">※空欄の場合、IDの表記が使用されます。</p>
      </div>
      <div class="field">
        <div class="control has-icons-left">
          <input v-model="password" class="input is-large" :class="errors.class('password')" type="password" placeholder="Password">
          <InputErrorMessage :msg="errors.msg('password')"/>
          <span class="icon is-large is-left">
            <i class="fas fa-key"></i>
          </span>
        </div>
        <p class="help">英小・大文字、数字の組み合わせで８文字以上</p>
      </div>
      <div class="field">
        <div class="control has-icons-left">
          <input v-model="confirm_password" class="input is-large" :class="errors.class('confirm_password')" type="password" placeholder="Confirm Password">
          <InputErrorMessage :msg="errors.msg('confirm_password')"/>
          <span class="icon is-large is-left">
            <i class="fas fa-key"></i>
          </span>
        </div>
      </div>
      <div class="field">
        <div class="control has-text-centered">
          <button @click="signUp" class="button is-primary is-large">Sign Up</button>
        </div>
      </div>
    </div>
    <p class="has-text-grey has-text-centered">
      <nuxt-link :to="{ name: 'signIn' }">戻る</nuxt-link>
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
      errors: new ErrorJson(),
      e_mail: '',
      user_id: '',
      user_name: '',
      password: '',
      confirm_password: ''
    }
  },
  head () {
    return {
      title: 'ユーザ登録'
    }
  },
  methods: {
    completionId () {
      if (!this.user_id) {
        const mail = this.e_mail.match(/^(.+)@/)
        if (mail && mail[1]) {
          this.user_id = mail[1]
        }
      }
    },
    signUp: preventDoubleSubmission(function () {
      return axios.post('/api/users', {
        e_mail: this.e_mail,
        user_id: this.user_id,
        user_name: this.user_name,
        password: this.password,
        confirm_password: this.confirm_password
      }).then((res) => {
        this.$router.push('/signIn')
      }).catch((err) => {
        this.errors = new ErrorJson(err.response.data)
      })
    })
  }
}
</script>

<template>
  <section>
    <div class="container">
      <div class="column is-8 is-offset-2">
        <h2 class="title">
          新しいルームを作成します
        </h2>
        <TopErrorMessage :errors="errors"/>
        <div class="field">
          <div class="control">
            <label class="label">
              ルームID<span class="tag is-medium is-info required">必須</span>
            </label>
            <input v-model="room_id" class="input" :class="errors.class('room_id')" type="text">
            <InputErrorMessage :msg="errors.msg('room_id')"/>
            <p class="help">
              英数字、一部の記号(_.-)のみ使用できます。
            </p>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="label">
             種類
            </label>
            <input v-model="room_type" id="type_public" value="public" class="is-checkradio" type="radio">
            <label class="label" for="type_public">
             公開
            </label>
            <input v-model="room_type" id="type_private" value="private" class="is-checkradio" type="radio">
            <label class="label" for="type_private">
             招待制
            </label>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="label">
             名前
            </label>
            <input v-model="room_name" class="input" type="text">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="label">
              説明
            </label>
            <input v-model="description" class="input" type="text">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button @click="create" class="button is-primary is-large" tabindex="0">
              作成
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import { preventDoubleSubmission } from '~/utils/form'
import ErrorJson from '~/utils/ErrorJson'
import TopErrorMessage from '~/components/TopErrorMessage'
import InputErrorMessage from '~/components/InputErrorMessage'

export default {
  components: {
    TopErrorMessage,
    InputErrorMessage
  },
  transition: {
    name: 'fade'
  },
  data () {
    return {
      errors: new ErrorJson(),
      room_id: '',
      room_type: 'public',
      room_name: '',
      description: ''
    }
  },
  head () {
    return {
      title: '新規ルーム作成'
    }
  },
  methods: {
    create: preventDoubleSubmission(function (event) {
      return axios.post('/api/rooms', {
        room_id: this.room_id,
        room_type: this.room_type,
        room_name: this.room_name,
        description: this.description
      }).then((res) => {
        this.$router.push('/rooms/' + res.data.room_id)
      }).catch((err) => {
        this.errors = new ErrorJson(err.response.data)
      })
    })
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

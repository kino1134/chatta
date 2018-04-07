<template>
  <p class="help is-danger" v-if="msg">
    {{ msg }}
  </p>
</template>

<script>
export default {
  props: {
    msg: {
      default: ''
    }
  }
}
</script>

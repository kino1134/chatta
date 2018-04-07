<template>
  <article class="message is-danger" v-if="errors.top">
    <div class="message-body">
      {{ errors.top }}
    </div>
  </article>
</template>

<script>
export default {
  props: {
    errors: {
      required: true
    }
  }
}
</script>

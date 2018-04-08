<template>
  <div class="container is-fluid">
    <RoomList/>
    <nuxt-child :key="$route.params.id" :class="'room'"/>
  </div>
</template>

<script>
import RoomList from '~/components/RoomList'

export default {
  components: {
    RoomList
  },
  mounted () {
    document.addEventListener('click', this.hideShowbar)
  },
  destroyed () {
    document.removeEventListener('click', this.hideShowbar)
  },
  methods: {
    hideShowbar () {
      document.querySelector('.sidebar').classList.remove('show')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 100%;
  margin: 0;
}

.room {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;

  @media(max-width: 779px) {
    & {
      position: fixed;
      left: 0;
      width: 100%;
      height: 100%;
      transition: right 0.25s cubic-bezier(0.5, 0, 0.1, 1), transform 0.1s linear, -webkit-transform 0.1s linear;
    }
  }
}
</style>

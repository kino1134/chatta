<template>
  <div class="room-action-wrapper">
    <header class="action-header">
      <h3 class="action-title">
        <i class="fa fa-info-circle fa-lg"></i>ルーム情報
      </h3>
      <a @click="cancel" class="action-close">
        <i class="fa fa-times"></i>
      </a>
    </header>
  </div>
</template>

<script>
export default {
  transition: {
    name: 'slide'
  },
  methods: {
    cancel () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.room-action-wrapper {
  width: 360px;
}

.action-header {
  padding: 1.5rem;
  display: flex;
  .action-title {
    flex: 1 1;
    .fa {
      margin-right: 10px;
    }
  }
  .action-close {
    color: inherit;
  }
}

.slide-enter {
  width: 0;
}

.slide-enter-active {
  transition: width .5s;
}
</style>

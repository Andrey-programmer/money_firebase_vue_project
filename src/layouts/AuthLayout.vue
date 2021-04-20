<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
  import messages from '@/my_utils/messages'

  export default {
    computed: {
      error() {
        return this.$store.getters.getError
      }
    },
    watch: {
      error(fbError) {
        this.$error(messages[fbError.code] || 'Что то пошло не так')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
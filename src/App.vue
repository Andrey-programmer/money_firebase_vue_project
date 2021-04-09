<template>
    <component :is="layout">
      <router-view/>
    </component>
</template>

<script>
  import AuthLayout from '@/layouts/AuthLayout'
  import MainLayout from '@/layouts/MainLayout'

  export default {
    components: {
      AuthLayout,
      MainLayout
    },
    computed: {
      layout() {
        return this.$route.meta.layout || 'auth-layout' //authLayout
      }
    }
  }
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/index.css';
</style>

<template>
  <div class="app-main-layout">
    <Navbar @click="navOpen = !navOpen"/>
    <Sidebar v-model="navOpen"/>

    <main class="app-content" :class="{full: !navOpen}">
      <div class="app-page">
        <router-view />  
      </div>
    </main>
    
    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/app/Navbar.vue'
  import Sidebar from '@/components/app/Sidebar.vue'

  export default {
    name: 'main-layout',
    data() {
      return {
        navOpen: true
      }
    },
    async mounted() {
      if (!Object.keys(this.$store.getters.getInfo).length) {
        await this.$store.dispatch('fetchInfo')
      }
    },
    components: {
      Navbar,
      Sidebar
    }
  }
</script>

<style lang="scss" scoped>

</style>

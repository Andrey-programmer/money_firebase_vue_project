<template>
  <div>
    <Loader v-if="loading"/>
    <div 
      class="app-main-layout"
      v-else
    >
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
  </div>
</template>

<script>
  import Navbar from '@/components/app/Navbar.vue'
  import Sidebar from '@/components/app/Sidebar.vue'
  import Loader from '../components/app/Loader.vue'

  export default {
    name: 'main-layout',
    data() {
      return {
        navOpen: true,
        loading: true
      }
    },
    async mounted() {
      if (!Object.keys(this.$store.getters.getInfo).length) {
        await this.$store.dispatch('fetchInfo')
      }
      this.loading = false
    },
    components: {
      Navbar,
      Sidebar,
      Loader
    }
  }
</script>

<style lang="scss" scoped>

</style>

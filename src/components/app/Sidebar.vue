<template>
  <ul class="sidenav app-sidenav" :class="{open : value}">
    <router-link
      v-for="link of links"
      tag="li"
      :key="link.url"
      active-class="active"
      :to="link.url"
      :exact="link.exact" 
    >
      <a
        class="waves-effect waves-orange pointer"
      >
        {{link.title}}
      </a>
    </router-link>
  </ul>
</template>

<script>
  export default {
    props: ['value'],
    data() {
      return {
        links: [
          {
            title: 'Счет',
            url: '/',
            exact: true,
          },
          {
            title: 'История',
            url: '/history',
          },
          {
            title: 'Планирование',
            url: '/planning',
          },
          {
            title: 'Новая запись',
            url: '/record',
          },
          {
            title: 'Категории',
            url: '/categories',
          }
        ]
      }
    },
    methods: {
      changeClass(index) {
        console.log(index)
        console.log(this.links[3])
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>

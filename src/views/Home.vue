<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader 
      v-if="loading"
    />
    <div 
      class="row" 
      v-else
    >
      <home-bill />
      <home-currency />
    </div>
  </div>
</template>

<script>
import Loader from '../components/app/Loader.vue'
import HomeBill from '../components/HomeBill.vue'
import HomeCurrency from '../components/HomeCurrency.vue'

export default {
  name: 'home',
  data() {
    return {
      loading: true,
      currency: null
    }
  },
  components: { HomeCurrency, HomeBill, Loader }
}
</script>

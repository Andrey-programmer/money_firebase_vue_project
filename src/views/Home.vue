<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button 
        class="btn waves-effect waves-light btn-small"
        @click="refrash"
      >
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
      <home-bill 
        :rates="currency.rates"
      />
      <home-currency 
        :rates="currency.rates"
        :date="currency.date"
      />
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
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  },
  methods: {
    async refrash() {
      this.loiading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  },
  components: { HomeCurrency, HomeBill, Loader }
}
</script>

<template>
  <div class="col s12 m6 l4">
      <div class="card light-blue bill-card">
        <div class="card-content white-text">
          <span class="card-title">Счет в валюте</span>
          <p 
            class="currency-line"
            v-for="currency of currencies"
            :key="currency"
          >
            <span>{{getCurrency(currency) | currency(currency)}}</span>
          </p>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    props: ['rates'],
    data() {
      return {
        currencies: ['RUB', 'USD', 'EUR']
      }
    },
    computed: {
      base() {
        return this.$store.getters.getInfo.bill / (this.rates['RUB'] / this.rates['EUR'])
      }
    }, 
    methods : {
      getCurrency(currency) {
        return Math.floor(this.base * this.rates[currency])
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
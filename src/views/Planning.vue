<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{getInfo.bill | currency('RUB')}}</h4>
    </div>
    <Loader v-if="loading"/>
    <p 
      class="center" 
      v-else-if="!categories.length"
    >
      Категорий пока нет. 
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>
    <section v-else>
      <div 
        v-for="category of categories"
        :key="category.id"
      >
        <p>
          <strong>{{category.title}}:</strong>
          {{category.spend}} из {{category.limit}}
        </p>
        <div class="progress" >
          <div
              class="determinate"
              :class="[category.progressColor]"
              :style="{width: category.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Loader from '../components/app/Loader.vue'
import {mapGetters} from 'vuex'

export default {
  components: { Loader },
    name: 'planning',
    data() {
      return {
        loading: true,
        categories: []
      }
    },
    computed: {
      ...mapGetters(['getInfo'])
    },
    async mounted() {
      const records = await this.$store.dispatch('fetchRecords')
      const categories = await this.$store.dispatch('fetchCategories')

      this.categories = categories.map(category => {
        // Рассчитываю расход
        const spend = records.filter(record => record.categoryId === category.id)
          .filter(record => record.type === 'outcome').reduce((summ, record) => {
            return summ += +record.amount
          }, 0)

        const spendPercent = spend/category.limit * 100
        const progressPercent = spendPercent > 100 ? 100 : spendPercent
        const progressColor = spendPercent < 60 ? 'green' : spendPercent < 100 ? 'yellow' : 'red' 
      
        return {
          ...category, 
          progressPercent,
          progressColor,
          spend
        }
      })
      this.loading = false
    }
  }
</script>

<style lang="scss" scoped>

</style>

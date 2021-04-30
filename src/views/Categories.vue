<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading"/>
      <div class="row" 
        v-else
      >
        <Category-create @created="addNewCategory"/>
        <Category-edit 
          v-if="categories.length"
          :categories="categories" 
          @updateCategory="updateCategories"
          :key="updater"
        />
        <p v-else class="center">
          У Вас нет ни одной категории
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import Loader from '../components/app/Loader.vue'
import CategoryCreate from '../components/CategoryCreate.vue'
import CategoryEdit from '../components/CategoryEdit.vue'
  export default {
  name: 'categories',
  data() {
    return {
      categories: [],
      loading: true,
      updater: 0  //добавил для обновления select
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    console.log(this.categories)
    this.loading = false
  },
  components: { CategoryCreate, CategoryEdit, Loader },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
      // console.log(this.categories)
      this.updater++
    },
    updateCategories(category) {
      const index = this.categories.findIndex(cat => cat.id === category.id)
      this.categories[index].title = category.title
      this.categories[index].limit = category.limit
      this.updater++
    }
  }
  }
</script>

<style lang="scss" scoped>

</style>

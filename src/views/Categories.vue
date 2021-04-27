<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <Category-create @created="addNewCategory"/>
        <Category-edit />
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '../components/CategoryCreate.vue'
import CategoryEdit from '../components/CategoryEdit.vue'
  export default {
  name: 'categories',
  data() {
    return {
      categories: []
    }
  },
  components: { CategoryCreate, CategoryEdit },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
      console.log(this.categories)
    }
  } 
  }
</script>

<style lang="scss" scoped>

</style>

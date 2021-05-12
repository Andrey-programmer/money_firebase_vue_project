<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>
      <form @submit.prevent="onSubmit"> 
        <div class="input-field" >
          <select
            ref="select"
            v-model="currentCategory"
          >
            <option
              v-for="category of categories"
              :key="category.id"
              :value="category.id"
            >
              {{category.title}} 
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="name">Название</label>
          <span 
            class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
          >
            Введите название категории
          </span>
        </div>
        <div class="input-field">
          <input
            id="limit" 
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          >
          <label for="limit">Лимит</label>
          <span 
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >
            Минимальное значение {{$v.limit.$params.minValue.min}}
          </span>
        </div>
        <button class="btn waves-effect waves-light" type="submit">
          Обновить
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'

export default { 
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      select: null,
      title: '',
      limit: 1000,
      currentCategory: null 
    }
  },
  validations: {
    title: {required},
    limit: {minValue: minValue(1000)}
  },
  created() {
    //Формирую категорию на этапе создания приложения
    const {id, title, limit} = this.categories[0]
    this.currentCategory = id
    this.title = title
    this.limit = limit
  },
  watch: {
    currentCategory(categoryId) {
      const {title, limit} = this.categories.find(category => category.id === categoryId)
      this.title = title
      this.limit = limit
    }
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const categoryData = {
        id: this.currentCategory,
        title: this.title,
        limit: this.limit
      }

      try {
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message('Категория успешно обновлена')
        this.$emit('updateCategory', categoryData)        
      } catch (error) {}
      
    }
  },
  mounted() {
    M.updateTextFields() //Исправил ошибку с наездом подсказки на поле
    this.select = M.FormSelect.init(this.$refs.select)
  },
  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }

}
</script>

<style>

</style>
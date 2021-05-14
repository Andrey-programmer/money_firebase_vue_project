<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="loading"/>

    <p 
    class="center" 
    v-else-if="!categories.length"
    >
      Категорий пока нет. 
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>

    <form 
      class="form" 
      v-else 
      @submit.prevent="onSubmit"
    >
      <div class="input-field" >
        <select 
          ref="select"
          v-model="category"
        >
          <option
          v-for="category of categories"
          :key="category.id"
          :value="category.id"
          >{{category.title}}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        >
        <label for="amount">Сумма</label>
        <span 
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
        >
          Минимальное значение {{$v.amount.$params.minValue.min}}
        </span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required}"
        >
        <label for="description">Описание</label>
        <span 
          class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
        >
          Заполните описание
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import Loader from '../components/app/Loader.vue'
import {required, minValue} from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex'

  export default {
  components: { Loader },
    data() {
      return {
        loading: true,
        categories: [], 
        select: null,
        category: null,
        type: 'outcome',
        amount: 100,
        description: ''
      }
    },
    validations: {
      amount: {minValue: minValue(100)},
      description: {required}
    },
    computed: {
      ...mapGetters(['getInfo']),//Достаю info из store(vuex)
      canCreateRecord() {
        // Если доход то плюсуем
        if(this.type === 'income') {
          return true
        }
        else {
          // Если расход то проверяем что на счете больше средств чем мы расходуем
          return this.getInfo.bill >= this.amount
        }
      } 
    },
    methods: {
      async onSubmit() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          console.log('Неверно заполнены поля')
          return
        }
        if(this.canCreateRecord) {          
          try {
            await this.$store.dispatch('createRecord', {
              categoryId: this.category,
              amount: this.amount,
              description: this.description,
              type: this.type, 
              date: new Date().toJSON()
            })
            // Обновляю счет
            const bill = this.type === 'income' 
            ? this.getInfo.bill + this.amount
            : this.getInfo.bill - this.amount

            await this.$store.dispatch('updateInfo', {bill})
            this.$message('Запись успешно создана')
            this.$v.$reset()// Чищу форму
            this.amount = 100
            this.description = ''
          } catch (error) {
            
          }
        } else {
          this.$message(`Недостаточно средств на счете ${this.amount - this.getInfo.bill}`)
        }
      }
    },
    async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories')
      this.loading = false

      if(this.categories.length) {
        this.category = this.categories[0].id
      }

      //setimeout(0) - лайфхак для того чтобы форма успела перерисоваться после следующей операции
      setTimeout(() => {
        this.select = M.FormSelect.init(this.$refs.select)
        M.updateTextFields() //Исправляем отображение инпутов
      }, 0)

      
    },
    destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
  }
</script>

<style lang="scss" scoped>

</style>

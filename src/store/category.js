import firebase from 'firebase/app'

export default {
  actions: {
    async createCategory({commit, dispatch}, {title, limit}) {
      try {
        const uid = await dispatch('getUserId')
        const category = await firebase.database().ref(`/users/${uid}/сategories`).push({title, limit})
        return {title, limit, id: category.key}
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async updateCategory({commit, dispatch}, {id, title, limit}) {
      try { 
        const uid = await dispatch('getUserId')
        //Достаю до id нужной категории и обновляю данные
        await firebase.database().ref(`/users/${uid}/сategories`).child(id).update({title, limit})
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async fetchCategories({commit, dispatch}){
      try {
        const uid = await dispatch('getUserId')
        const categories = (await firebase.database().ref(`/users/${uid}/сategories`).once('value')).val() || {}
        
        // Первый вариант
        return Object.keys(categories).map((key) => ({...categories[key], id: key}))
        
        // Второй вариант
        // const categoriesArray = []
        // Object.keys(categories).forEach(key => {
        //   categoriesArray.push({
        //     title: categories[key].title,
        //     limit: categories[key].limit,
        //     id: key
        //   })
        // })
        // return categoriesArray

       

      } catch (error) {
        commit('setError', error)
        throw error
      }
    }
  }
}
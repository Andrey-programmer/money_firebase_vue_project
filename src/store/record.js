import firebase from 'firebase/app'

export default {
  actions: {
    async createRecord({dispatch, commit}, record) {
      try {
        const uid = await dispatch('getUserId')
        return await firebase.database().ref(`/users/${uid}/records`).push(record)

      } catch (error) {  
        commit('setError', error)        
        throw error
      }
    },
    async fetchRecords({dispatch, commit}, record) {
      try {
        const uid = await dispatch('getUserId')
        const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}
        
        // Первый вариант
        return Object.keys(records).map((key) => ({...records[key], id: key}))

      } catch (error) {  
        commit('setError', error)        
        throw error
      }
    }
  }
}
import firebase from 'firebase/app'

export default {
  state: {
    info: {}
  },
  getters: {
    getInfo (s) {
      return s.info
    }
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    }
  },
  actions: {
    async fetchInfo({dispatch, commit}) {
      try {
        const uid = await dispatch('getUserId')
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        commit('setInfo', info)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async updateInfo({dispatch, commit, getters}, toUpdate) {
      try {
        const uid = await dispatch('getUserId')

        //Произвожу слияние геттера store.getInfo и то что пришло с записи
        const updateData = {...getters.getInfo, ...toUpdate} 
        await firebase.database().ref(`/users/${uid}/info`).update(updateData)
        commit('setInfo', updateData)
      } catch (error) {
        commit('setError', error)
        throw error
      }
    }
  }
}
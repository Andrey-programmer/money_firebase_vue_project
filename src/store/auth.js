import firebase from 'firebase/app'
import { register } from 'register-service-worker'

export default {
  state: {

  },
  actions: {
    async login({commit, dispatch}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (error) {
        commit('setError', error)
        // Прерываю действие (дальнейший редирект)
        throw error
      }
    },
    async logout() {
      try {
        await firebase.auth().signOut()
      } catch (error) {
        commit('setError', error)
        throw error
      }
    },
    async register({commit, dispatch}, {email, password, name}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUserId')
        // Заношу в таблицу пользователей информацию о данном пользователе
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 1000000,
          name
        })
      } catch (error) {
        commit('setError', error)
        throw error 
      }
    },
    //получаю id пользователя
    getUserId() {
      const user = firebase.auth().currentUser
      return user? user.uid : null
    }
  }
}
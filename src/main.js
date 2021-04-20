import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import dateFilter from './filters/date.filter'
import router from './router'
import store from './store'
import messagePlugin from '@/my_utils/message.plugin' //Создал сам
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(messagePlugin) //использовал собственный плагин
Vue.filter('date', dateFilter)

const firebaseConfig = {
  apiKey: "AIzaSyAsw8kbovtT6XmnlFcmxELY-jqWY4bWtFE",
  authDomain: "my-money-vue.firebaseapp.com",
  projectId: "my-money-vue",
  storageBucket: "my-money-vue.appspot.com",
  messagingSenderId: "100658229954",
  appId: "1:100658229954:web:607b275e4bc3d06550c15b",
  measurementId: "G-03FR5J8B65"
}

firebase.initializeApp(firebaseConfig) //запуска. инициализацию приложения

let app

// Запускаю приложение и запрещаю его перезагрузку при изменениии State
firebase.auth().onAuthStateChanged(() => {

  // Если приложение ранее не было создано то создаю его
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})



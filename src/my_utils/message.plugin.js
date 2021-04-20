export default {
  install(Vue, options) {
    // Добавляем в прототип Vue метод $message
    Vue.prototype.$message = function(text) {
      M.toast({html: text})
    }

    // Добавляем в прототип Vue метод $error
    Vue.prototype.$error = function(error) {
      M.toast({html: `[Ошибка] : ${error}`})
    }
  }
}
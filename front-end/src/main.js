import Vue from 'vue'
import App from './App.vue'
import router from './router'
import mock from './mock-data.js'

// Vue.config.productionTip = false
let data = {
  items: mock,
  user: null
}

new Vue({
  router,
  //might need to change the data statement to: data,
  data: data,
  render: h => h(App)
}).$mount('#app')

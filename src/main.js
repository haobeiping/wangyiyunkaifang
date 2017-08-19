// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
Vue.config.productionTip = false

import vueResource from 'vue-resource'
Vue.use(vueResource)
Vue.http.options.root = 'http://192.168.7.135:4000/'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

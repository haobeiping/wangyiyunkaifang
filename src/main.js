// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css'
Vue.config.productionTip = false

import vueResource from 'vue-resource'
Vue.use(vueResource)
Vue.http.options.root = 'http://localhost:4000/'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

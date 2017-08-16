import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/player/:id',
      name: 'player',
      component: require('../views/Player.vue')
    },
    {
      path: '/lyric',
      name: 'Lyric',
      component: require('../views/Lyric.vue')
    }
  ]
})

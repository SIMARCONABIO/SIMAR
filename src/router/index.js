import Vue from 'vue'
import Router from 'vue-router'
import GeoportalRouter from './geoportal'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    ...GeoportalRouter
  ]
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueCookie from 'vue-cookie'

import App from './App'
import router from './router'
import store from './store'

import SocialSharing from 'vue-social-sharing'

// Element-ui
import './config/element-ui'

// STYLES
import 'bootstrap/scss/bootstrap.scss'
import './assets/icons/style.css'
import './assets/styles/_global.scss'

Vue.use(VueCookie)
Vue.use(SocialSharing)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})

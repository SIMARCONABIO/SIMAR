import Vue from 'vue'
import Vuex from 'vuex'

import app from './app'
import catalogs from './catalogs'
import categories from './categories'
import products from './products'
import users from './users'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    catalogs,
    categories,
    products,
    users
  }
})

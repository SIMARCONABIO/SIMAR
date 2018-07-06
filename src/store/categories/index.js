import http from '@/config/http'
import BaseStore from '@/store/base-store'

const options = {
  state: {
    layersTree: null
  },
  getters: {
    layersTree (state) {
      return state.layersTree
    }
  },
  mutations: {
    layersTree (state, payload) {
      state.layersTree = payload
    }
  },
  actions: {
    layersTree ({commit}) {
      return http.get('categories/layers').then((response) => {
        commit('layersTree', response.data)
      })
    }
  }
}
export default new BaseStore('categories', options)

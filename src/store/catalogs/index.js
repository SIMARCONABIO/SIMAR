import BaseStore from '@/store/base-store'

const options = {
  mutations: {
    removeAddCatalog (state, payload) {
      let index = state.items.findIndex(layer => {
        return layer.composition === payload.composition
      })
      state.items[index].add = false
    }
  },
  actions: {
    removeAddCatalog ({commit}, payload) {
      commit('removeAddCatalog', payload)
    }
  }
}
export default new BaseStore('catalogs', options)

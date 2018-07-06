import http from '@/services/http.service'
import authService from '@/services/auth.service'
export default {
  namespaced: true,
  state: {
    loading: false,
    formatGPS: 'metric', // metric, dms
    baseMap: 'World_Imagery', // World_Imagery, World_Shaded_Relief, NatGeo_World_Map,
    showLabels: false,
    profile: null
  },
  getters: {
    loading: state => {
      return state.loading
    },
    sendFormat: state => {
      return state.formatGPS
    },
    baseMap: state => {
      return state.baseMap
    },
    showLabels: state => {
      return state.showLabels
    },
    profile: state => {
      return state.profile
    }
  },
  mutations: {
    loading (state, payload) {
      state.loading = payload
    },
    gpsFormat (state, payload) {
      state.formatGPS = payload
    },
    baseMap (state, payload) {
      state.baseMap = payload
    },
    showLabels (state, payload) {
      state.showLabels = payload
    },
    profile (state, payload) {
      state.profile = payload
    }
  },
  actions: {
    loading ({commit}, payload) {
      commit('loading', payload)
    },
    gpsFormat ({commit}, payload) {
      commit('gpsFormat', payload)
    },
    baseMap ({commit}, payload) {
      commit('baseMap', payload)
    },
    showLabels ({commit}, payload) {
      commit('showLabels', payload)
    },
    profile ({commit}) {
      return http.get('user/me').then((response) => {
        commit('profile', response.data)
      })
    },
    logout ({commit}) {
      commit('profile', null)
      authService.logout()
    }
  }
}

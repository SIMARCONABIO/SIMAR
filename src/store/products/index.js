import BaseStore from '@/store/base-store'
import http from '@/config/http'
import moment from 'moment'

const options = {
  state: {
    showLayers: [],
    buoys: null,
    polygons: null,
    polygonsAlert: null,
    buoyChart: null,
    chartBuoyData: null,
    alertsData: null
  },
  getters: {
    showLayers (state) {
      return state.showLayers
    },
    buoys (state) {
      return state.buoys
    },
    polygons (state) {
      return state.polygons
    },
    polygonsAlert (state) {
      return state.polygonsAlert
    },
    buoyChart (state) {
      return state.buoyChart
    },
    chartBuoyData (state) {
      return state.chartBuoyData
    },
    alertsData (state) {
      return state.alertsData
    }
  },
  mutations: {
    addShowLayer (state, payload) {
      state.showLayers.push(payload)
    },
    removeShowLayer (state, payload) {
      let index = state.showLayers.findIndex(layer => {
        return layer.composition === payload.composition
      })
      if (index >= 0) { state.showLayers.splice(index, 1) }
    },
    modifyLayer (state, payload) {
      let index = state.showLayers.findIndex(layer => {
        return layer.composition === payload.composition
      })
      if (index >= 0) { Object.assign(state.showLayers[index], {...payload}) }
    },
    layerOpacity (state, {index, opacity}) {
      Object.assign(state.showLayers[index], {opacity})
    },
    updateShowLayers (state, payload) {
      state.showLayers = payload
      // for (let index in state.showLayers) {
      //   Object.assign(state.showLayers[index], payload[index])
      // }
    },
    toggleShowLayer (state, payload) {
      state.showLayers[payload].show = !state.showLayers[payload].show
    },
    buoys (state, payload) {
      state.buoys = payload
    },
    polygons (state, payload) {
      state.polygons = payload
    },
    polygonsAlert (state, payload) {
      state.polygonsAlert = payload
    },
    buoyChart (state, payload) {
      state.buoyChart = payload
    },
    chartBuoyData (state, payload) {
      state.chartBuoyData = payload
    },
    alertsData (state, payload) {
      state.alertsData = payload
    }
  },
  actions: {
    addShowLayer ({commit, dispatch}, payload) {
      return dispatch('query', {
        'filters[where][composition][eq]': payload.layer.composition,
        // 'filters[where][productStartDate][lte]': payload.layerDate,
        // 'filters[where][productEndDate][gte]': payload.layerDate,
        sort: 'productEndDate desc',
        limit: 1
      }).then(({data}) => {
        if (data.items.length) {
          commit('addShowLayer', {...payload.layer, ...data.items[0], opacity: 1, show: true, hasData: true})
        } else {
          commit('addShowLayer', {...payload.layer, opacity: 1, show: true, hasData: false})
        }
      })
    },
    layerOpacity ({state, rootState, commit, dispatch, getters, rootGetters}, payload) {
      commit('layerOpacity', payload)
    },
    removeShowLayer ({commit}, payload) {
      commit('removeShowLayer', payload)
    },
    changeShowLayersDate ({commit, state, dispatch}, payload) {
      let compositions = []
      for (let layer of state.showLayers) {
        compositions.push(layer.composition)
      }
      return dispatch('query', {
        'filters[whereIn][composition]': compositions,
        'filters[where][productStartDate][lte]': payload,
        'filters[where][productEndDate][gte]': payload
      }).then(({data}) => {
        if (data.items.length) {
          for (let showIndex in state.showLayers) {
            let layer = data.items.find(layer => {
              return layer.composition === state.showLayers[showIndex].composition
            })
            if (layer) {
              commit('modifyLayer', {...layer, show: true, hasData: true})
            } else {
              commit('modifyLayer', {...state.showLayers[showIndex], hasData: false})
            }
          }
        }
      })
    },
    updateShowLayers ({commit}, payload) {
      commit('updateShowLayers', payload)
    },
    toggleShowLayer ({state, rootState, commit, dispatch, getters, rootGetters}, payload) {
      commit('toggleShowLayer', payload)
    },
    getBuoys ({state, rootState, commit, dispatch, getters, rootGetters}, payload) {
      return http.get('buoys/geojson').then(response => {
        commit('buoys', response.data)
      })
    },
    getPolygons ({state, rootState, commit, dispatch, getters, rootGetters}, payload) {
      var params = {}
      params.zoom = payload.getZoom()
      params.east = payload.getBounds().getEast()
      params.west = payload.getBounds().getWest()
      params.south = payload.getBounds().getSouth()
      params.north = payload.getBounds().getNorth()
      let urlParameters = Object.entries(params).map(e => e.join('=')).join('&')
      return http.get('polygons/geojson?' + urlParameters).then(response => {
        commit('polygons', response.data)
      })
    },
    cleanPolygons ({commit}) {
      commit('polygons', null)
    },
    getPolygonsAlert ({state, rootState, commit, dispatch, getters, rootGetters}, payload) {
      return http.get('polygons/geojson-alert').then(response => {
        commit('polygonsAlert', response.data)
      })
    },
    cleanPolygonsAlert ({commit}) {
      commit('polygonsAlert', null)
    },
    selectBuoy ({state, rootState, commit, dispatch, getters, rootGetters}, payload) {
      commit('buoyChart', payload)
    },
    getAlertsData ({state, rootState, commit, dispatch, getters, rootGetters}, payload) {
      let params
      if (payload) {
        params = {
          'filters[where][year][eq]': payload.year,
          'filters[where][week][eq]': payload.week,
          'fields': 'level,gid_anp,year,week'
        }
      } else {
        params = {
          'fields': 'level,gid_anp,year,week',
          sort: 'year desc,week desc',
          limit: 1
        }
      }
      return http.get('polygons/alert-level', {params}).then(response => {
        if (response.data) {
          commit('alertsData', response.data)
        }
      })
    },
    getChartBuoyData ({state, rootState, commit, dispatch, getters, rootGetters}, payload) {
      let productStartDate = moment.utc(moment(payload.productStartDate).format('YYYY-MM-DD')).toISOString()
      let productEndDate = moment.utc(moment(payload.productEndDate).format('YYYY-MM-DD')).toISOString()
      if (payload) {
        return http.get('buoys/time-plot', {params: {
          'filters[where][composition][eq]': payload.firstComposition,
          'filters[where][buoyId][eq]': payload.buoyId,
          'filters[where][productStartDate][gte]': productStartDate,
          'filters[where][productEndDate][lte]': productEndDate
        }}).then(response => {
          let data = []
          let labels = []
          let chartData = {}
          let secondData = []
          let secondLabels = []
          for (let dataItem of response.data) {
            data.push({
              x: new Date(dataItem.product_start_date),
              y: parseFloat(dataItem.temperature)
            })
            labels.push(moment(dataItem.product_start_date).format('DD/MM/YYYY'))
          }
          if (payload.enableSecondComposition) {
            return http.get('buoys/time-plot', {params: {
              'filters[where][composition][eq]': payload.secondComposition,
              'filters[where][buoyId][eq]': payload.buoyId,
              'filters[where][productStartDate][gte]': productStartDate,
              'filters[where][productEndDate][lte]': productEndDate
            }}).then(response => {
              for (let dataItem of response.data) {
                secondData.push({
                  x: new Date(dataItem.product_start_date),
                  y: parseFloat(dataItem.temperature)
                })
                secondLabels.push(moment(dataItem.product_start_date).format('DD/MM/YYYY'))
              }
              chartData = {
                datasets: [
                  {
                    labels,
                    label: payload.firstComposition,
                    borderWidth: 2,
                    pointBorderWidth: 1,
                    pointRadius: 2,
                    pointBackgroundColor: '#23A1C8',
                    borderColor: '#23A1C8',
                    fill: false,
                    xAxisID: 'x-axis-1',
                    yAxisID: 'y-axis-1',
                    data
                  },
                  {
                    labels: secondLabels,
                    label: payload.secondComposition,
                    borderWidth: 2,
                    pointBorderWidth: 1,
                    pointRadius: 2,
                    pointBackgroundColor: '#b425be',
                    borderColor: '#b425be',
                    fill: false,
                    xAxisID: 'x-axis-2',
                    yAxisID: 'y-axis-2',
                    data: secondData
                  }
                ]
              }
              commit('chartBuoyData', chartData)
            })
          } else {
            chartData = {
              labels,
              datasets: [
                {
                  labels,
                  label: payload.firstComposition,
                  borderWidth: 2,
                  pointBorderWidth: 1,
                  pointRadius: 2,
                  borderColor: '#23A1C8',
                  pointBackgroundColor: '#23A1C8',
                  fill: false,
                  data
                }
              ]
            }
            commit('chartBuoyData', chartData)
          }
        })
      } else {
        commit('chartBuoyData', null)
      }
    }
  }
}
export default new BaseStore('products', options)

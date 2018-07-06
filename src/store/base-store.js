/**
 * Created by Fernando Torres on 13/12/2017.
 */
import http from '@/config/http'
import {Notification} from 'element-ui'

const parseUrl = (state, id) => {
  if (state.relationModel && id) {
    return state.model + '/' + id + '/' + state.relationModel
  } else {
    return id ? state.model + '/' + id : state.model
  }
}

const removeInternalParams = (params) => {
  if (typeof params === 'object') {
    for (let a in params) {
      if (a.indexOf('$') >= 0) {
        delete params[a]
      }
    }
  }
  return params
}

export default class BaseStore {
  constructor (model, options) {
    options = options || {}
    this.namespaced = true
    /**
     * State
     * @returns {{model: *, relationModel: null, items: Array, item: {}, pagination: {}}}
     */
    this.state = () => {
      return Object.assign({
        model: model,
        relationModel: null,
        items: [],
        item: {},
        pagination: {}
      }, options.state)
    }

    this.getters = Object.assign({
      items: (state, getters, rootState, rootGetters) => {
        return state.items
      },
      item: (state, getters, rootState, rootGetters) => {
        return state.item
      },
      pagination: (state, getters, rootState, rootGetters) => {
        return state.pagination
      }
    }, options.getters)

    this.mutations = Object.assign({
      items (state, items) {
        state.items = items
      },
      item (state, item) {
        state.item = item
      },
      pagination (state, pagination) {
        state.pagination = pagination
      }
    }, options.mutations)

    this.actions = Object.assign({
      /**
       *
       * @param dispatch
       * @param commit
       * @param getters
       * @param rootGetters
       * @param state
       * @param id
       */
      get ({dispatch, commit, getters, rootGetters, state}, payload) {
        let params = removeInternalParams(Object.assign({}, payload))
        let id = params.id
        delete params.id
        let request = http.get(parseUrl(state, id), {params: params})
        request.then(response => {
          commit('item', response.data)
        }).catch(error => {
          Notification.error({
            title: 'Error',
            message: 'Hubo un error al tratar de obtener el elemento'
          })
          throw new Error(error.message)
        })
        return request
      },
      /**
       *
       * @param dispatch
       * @param commit
       * @param getters
       * @param rootGetters
       * @param state
       * @param params
       */
      query ({dispatch, commit, getters, rootGetters, state}, payload) {
        let params = removeInternalParams(Object.assign({}, payload))
        let options = {params: params}
        return http.get(parseUrl(state), options).then(response => {
          commit('items', response.data.items)
          commit('pagination', response.data.pagination)
          return response
        })
      },
      /**
       * Saves an resource and stores it in the state
       * @param dispatch
       * @param commit
       * @param getters
       * @param rootGetters
       * @param payload
       * @returns {*|AxiosPromise<any>}
       */
      save ({dispatch, commit, getters, rootGetters, state}, payload) {
        let params = removeInternalParams(Object.assign({}, payload))
        if (params.id) {
          return http.put(parseUrl(state, params.id), params)
        } else {
          return http.post(parseUrl(state), params)
        }
      },
      /**
       *
       * @param dispatch
       * @param commit
       * @param getters
       * @param rootGetters
       * @param state
       * @param params
       * @returns {*|AxiosPromise<any>}
       */
      update ({dispatch, commit, getters, rootGetters, state}, payload) {
        let params = removeInternalParams(Object.assign({}, payload))
        return http.post(parseUrl(state, params.id), params)
      },
      /**
       * Deletes a resource by ID
       * @param dispatch
       * @param commit
       * @param getters
       * @param rootGetters
       * @param id
       */
      delete ({dispatch, commit, getters, rootGetters, state}, id) {
        return http.delete(parseUrl(state, id))
      }
    }, options.actions)
  }
}

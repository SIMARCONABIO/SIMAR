/**
 * Created by Fernando Torres on 02/11/2017.
 */

import axios from 'axios'
import store from './../store'
import Router from '../router'
import ErrorsCatalog from '../config/errors.catalog'

const http = axios.create({
  baseURL: process.env.API_BASE_URL
})
// Add a request interceptor
http.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    store.dispatch('app/loading', true)
    config.headers = {
      authorization: 'Bearer ' + store.getters['login/token']
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
http.interceptors.response.use(
  function (response) {
    // Do something with response data
    store.dispatch('app/loading', false)
    return response
  },
  function (httpError) {
    // Do something with response error
    store.dispatch('app/loading', false)
    let notification = {
      group: 'app',
      title: 'Error en la petición',
      text: 'Hubo un error al realizar su petición'
    }
    if (httpError.response === undefined) {
      notification.title = 'Sin respuesta del servidor'
      notification.description =
        'No tiene acceso a internet o el servidor no responde'
    } else {
      let errorType = httpError.response.data.code || 'DEFAULT'
      let error = ErrorsCatalog[httpError.response.data.status][errorType]
      notification.title = error.title
      notification.message = error.description
      switch (httpError.response.data.status) {
        case 401:
          store.dispatch('login/removeAuthToken')
          Router.push('/')
          break
      }
    }
    // store.dispatch('notifications/error', notification)
    return Promise.reject(httpError)
  }
)

export default http

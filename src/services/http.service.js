import axios from 'axios'
import AuthService from './auth.service'
import httpErrorNotification from './http-error-notification.service'
import router from '@/router'

const http = axios.create({
  baseURL: process.env.API_BASE_URL
})

http.interceptors.request.use(
  function (config) {
    if (AuthService.token()) {
      config.headers = {
        authorization: AuthService.token()
      }
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  function (response) {
    return response
  },
  function (httpError) {
    if (httpError.response.status === 401) {
      AuthService.logout()
      router.push(AuthService.logoutRoute)
    }
    httpErrorNotification(httpError.response)
    return Promise.reject(httpError)
  }
)

export default http

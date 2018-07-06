import axios from 'axios'
import Cookies from 'js-cookie'

export default class MSAuth {
  constructor (authURL, successRoute, errorRoute = '/') {
    this.authURL = authURL
    this.successRoute = successRoute
    this.errorRoute = errorRoute
  }

  set redirectURL (route) {
    if (typeof route === 'object') {
      this.__redirectRoute__ = route
    } else {
      throw new Error('The route must be a route object')
    }
  }

  authenticate (username, password, rememberMe) {
    this.logout()
    return axios.post(this.authURL, {
      email: username,
      password: password,
      rememberMe: rememberMe
    }).then((response) => {
      let authTokenOptions = {}
      let refreshTokenOptions = {}
      if (response.data.rememberMe) {
        authTokenOptions.expires = new Date(new Date().getTime() + response.data.tokenLife)
      }
      Cookies.set('auth-token', response.data.token, authTokenOptions)
      Cookies.set('auth-refresh-token', response.data.refreshToken, refreshTokenOptions)
      return response
    }).catch((error) => {
      this.logout()
      throw error
    })
  }

  get redirectURL () {
    return this.__redirectRoute__ || this.successRoute
  }
  logout () {
    Cookies.remove('auth-token')
    Cookies.remove('auth-refresh-token')
  }

  isAuthenticated () {
    return !!Cookies.get('auth-token')
  }

  token () {
    return Cookies.get('auth-token')
  }
}

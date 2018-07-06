import http from '@/services/http.service'
import BaseStore from '@/store/base-store'

const options = {

  actions: {
    register (context, payload) {
      return http.post('users/register', payload)
    }
  }
}
export default new BaseStore('users', options)

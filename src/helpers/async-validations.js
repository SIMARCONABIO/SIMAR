import http from '@/services/http.service'

export default {
  unique (resource, property, value) {
    let promise = new Promise(function (resolve, reject) {
      let searchParams = {params: {}}
      searchParams.params['filters[where][' + property + '][eq]'] = value
      http.get(resource, searchParams).then(({data}) => {
        if (data.pagination.total > 0) {
          reject(new Error('The value has been taken'))
        } else {
          resolve()
        }
      })
    })
    return promise
  }
}

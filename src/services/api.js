import Axios from 'axios'
import { requestInterceptor, responseInterceptor, errorInterceptor } from '../utils/interceptors'

export class Api {
  $http

  constructor() {
    this.$http = Axios.create({
      baseURL: process.env.API_URL || '/api'
    })

    this.$http.interceptors.request.use(requestInterceptor)

    this.$http.interceptors.response.use(responseInterceptor, errorInterceptor)
  }

  getById(endpoint, id) {
    return this.$http.get(`${endpoint}/${id}`)
  }

  list(endpoint, params) {
    return this.$http.get(endpoint, { params })
  }

  post(endpoint, data) {
    return this.$http.post(endpoint, data)
  }

  update(endpoint, id, data) {
    return this.$http.put(`${endpoint}/${id}`, data)
  }
}

export default new Api()

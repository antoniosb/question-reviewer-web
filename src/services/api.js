import Axios from 'axios'
import { isAuthenticated, getToken, removeData } from '../redux/modules/user'
import store from '../redux/store'

class Api {
  $http

  constructor() {
    this.$http = Axios.create({
      baseURL: process.env.API_URL || '/api'
    })

    this.$http.interceptors.request.use((config) => {
      if (config.url.indexOf('auth/token') === -1 && config.url.indexOf('/users') === -1) {
        if (!isAuthenticated(store.getState().user)) {
          window.location.reload()
        } else {
          config.headers.Authorization = getToken(store.getState().user)
        }
      }
    
      return config
    })

    this.$http.interceptors.response.use(response => response, (err) => {
      if (err.response && err.response.status === 401) {
        store.dispatch(removeData())
        return window.location.reload()
      }
      return Promise.reject(err)
    })
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

import { isAuthenticated, getToken, removeData } from '../redux/modules/user'
import store from '../redux/store'

export const requestInterceptor = (config) => {
  if (config.url.indexOf('auth/token') === -1 && config.url.indexOf('/users') === -1) {
    config.headers.Authorization = getToken(store.getState().user)
  }

  return config
}

export const responseInterceptor = (response) => response
export const errorInterceptor = (err) => {
  if (err.response && err.response.status === 401) {
    store.dispatch(removeData())
  }
  return Promise.reject(err)
}
import api from "./api"
import store from '../redux/store'
import { setData, removeData } from '../redux/modules/user'

class UserService {
  login (data) {
    return new Promise((resolve, reject) => {
      api.post('/auth/token', data).then((response) => {
        store.dispatch(setData(response.data))
        resolve()
      }).catch((err) => { reject(err) })
    })
  }

  signUp (data) {
    return new Promise((resolve, reject) => {
      api.post('/users', data).then((response) => {
        store.dispatch(setData(response.data))
        resolve()
      }).catch((err) => { reject(err) })
    })
  }
  
  logout () {
    store.dispatch(removeData())
  }
}

export default new UserService()

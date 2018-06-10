import api from "./api"
import store from '../redux/store'
import { setApprovedList, setReprovedList, setPendentList } from '../redux/modules/question'

class QuestionService {
  load () {
    return new Promise((resolve, reject) => {
      Promise.all([
        api.list('/questions', { status: 'A' }),
        api.list('/questions', { status: 'R' }),
        api.list('/questions', { status: 'P' })
      ]).then((values) => {
        store.dispatch(setApprovedList(values[0].data))
        store.dispatch(setReprovedList(values[1].data))
        store.dispatch(setPendentList(values[2].data))
        resolve();
      }).catch(err => reject(err))
    })
  }

  get(id) {
    return new Promise((resolve, reject) => {
      api.getById('/questions', id).then((response) => {
        resolve(response.data)
      }).catch(err => reject(err))
    })
  }

  review (id, status, data) {
    return new Promise((resolve, reject) => {
      api.post(`/questions/${id}/revisions`, Object.assign({ status }, data)).then((response) => {
        this.load().then(resolve).catch(reject)
      }).catch((err) => reject(err))
    })
  }

  approve (id) {
    return this.review(id, 'A')
  }

  create (data) {
    return new Promise((resolve, reject) => {
      api.post('/questions', data).then((response) => {
        resolve()
      }).catch((err) => reject(err))
    })
  }

  reprove (id, comment) {
    return this.review(id, 'R', { comment })
  }

  update (data) {
    const id = data.id
    delete data.id
    return new Promise((resolve, reject) => {
      api.update('/questions', id, data).then((response) => {
        resolve()
      }).catch((err) => reject(err))
    })
  }
}

export default new QuestionService()

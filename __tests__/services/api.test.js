import Axios from 'axios'
import api from '../../src/services/api'

describe('Services > Api', () => {
  test('List', (done) => {
    api.$http.get = () => new Promise((resolve) => resolve({ id: 0 }))
    api.list().then((data) => {
      expect(data.id).toEqual(0)
      done()
    })
  })
  test('GetById', (done) => {
    api.$http.get = () => new Promise((resolve) => resolve({ id: 0 }))
    api.getById().then((data) => {
      expect(data.id).toEqual(0)
      done()
    })
  })
  test('Post', (done) => {
    api.$http.post = () => new Promise((resolve) => resolve({ id: 0 }))
    api.post().then((data) => {
      expect(data.id).toEqual(0)
      done()
    })
  })
  test('Update', (done) => {
    api.$http.put = () => new Promise((resolve) => resolve({ id: 0 }))
    api.update().then((data) => {
      expect(data.id).toEqual(0)
      done()
    })
  })
})
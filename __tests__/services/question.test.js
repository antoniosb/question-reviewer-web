import questionService from '../../src/services/question'
jest.mock('../../src/services/api')
import api from '../../src/services/api'
import store from '../../src/redux/store'

describe('Services > Question', () => {
  test('Load Error', (done) => {
    api.list.mockImplementation(() => Promise.reject(new Error('test error')))
    questionService.load().catch((err) => {
      expect(err.message).toEqual('test error')
      done()
    })
  })
  test('Load', (done) => {
    api.list.mockResolvedValue({ data: [{}] })
    questionService.load().then(() => {
      expect(store.getState().question.approved).toHaveLength(1)
      expect(store.getState().question.reproved).toHaveLength(1)
      expect(store.getState().question.pendent).toHaveLength(1)
      done()
    })
  })
  test('Get Error', (done) => {
    api.getById.mockImplementation(() => Promise.reject(new Error('test error')))
    questionService.get().catch((err) => {
      expect(err.message).toEqual('test error')
      done()
    })
  })
  test('Get', (done) => {
    api.getById.mockResolvedValue({ data: { id: 0} })
    questionService.get().then((res) => {
      expect(res.id).toEqual(0)
      done()
    })
  })
  test('Review Error', (done) => {
    api.post.mockImplementation(() => Promise.reject(new Error('test error')))
    questionService.approve().catch((err) => {
      expect(err.message).toEqual('test error')
      done()
    })
  })
  test('Review', (done) => {
    api.post.mockResolvedValue({id: 0})
    api.list.mockResolvedValue({ data: [{}] })
    questionService.reprove().then((res) => {
      expect(store.getState().question.reproved).toHaveLength(1)
      done()
    })
  })
  test('Update Error', (done) => {
    api.update.mockImplementation(() => Promise.reject(new Error('test error')))
    questionService.update({id: 0}).catch((err) => {
      expect(err.message).toEqual('test error')
      done()
    })
  })
  test('Update', (done) => {
    api.update.mockResolvedValue({id: 0})
    questionService.update({ id: 0 }).then((res) => {
      done()
    })
  })
  test('Create Error', (done) => {
    api.post.mockImplementation(() => Promise.reject(new Error('test error')))
    questionService.create().catch((err) => {
      expect(err.message).toEqual('test error')
      done()
    })
  })
  test('Create', (done) => {
    api.post.mockResolvedValue({id: 0})
    questionService.create().then((res) => {
      done()
    })
  })
})
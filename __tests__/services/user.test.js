import userService from '../../src/services/user'
jest.mock('../../src/services/api')
import api from '../../src/services/api'
import store from '../../src/redux/store'

describe('Services > User', () => {
  test('Login Error', (done) => {
    api.post.mockImplementation(() => Promise.reject(new Error('test error')))
    userService.login({}).catch((err) => {
      expect(err.message).toEqual('test error')
      done()
    })
  })
  test('Login', (done) => {
    api.post.mockResolvedValue({ data: { user: { id: 0 }, token: 'token'} })
    userService.login({}).then(() => {
      expect(store.getState().user.token).toEqual('token')
      done()
    })
  })
  test('Logout', () => {
    userService.logout()
    expect(store.getState().user.token).not.toEqual('token')
  })
  test('Signup Error', (done) => {
    api.post.mockImplementation(() => Promise.reject(new Error('test error')))
    userService.signUp({}).catch((err) => {
      expect(err.message).toEqual('test error')
      done()
    })
  })
  test('Signup', (done) => {
    api.post.mockResolvedValue({ data: { user: { id: 0 }, token: 'token'} })
    userService.signUp({}).then(() => {
      expect(store.getState().user.token).toEqual('token')
      done()
    })
  })
})
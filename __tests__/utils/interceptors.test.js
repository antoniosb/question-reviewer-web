import * as interceptors from '../../src/utils/interceptors'
import store from '../../src/redux/store'
import { setData } from '../../src/redux/modules/user'

describe('Utils > Interceptors', () => {
  beforeAll(() => {
    store.dispatch(setData({ user: { id: 0 }, token: 'token'}))
  })
  test('Request Login', () => {
    const formatado = interceptors.requestInterceptor({ url: 'auth/token', headers: { Authorization: null } })
    expect(formatado.headers.Authorization).toEqual(null)
  })
  test('Request SignUp', () => {
    const formatado = interceptors.requestInterceptor({ url: '/users', headers: { Authorization: null } })
    expect(formatado.headers.Authorization).toEqual(null)
  })
  test('Request Private', () => {
    const formatado = interceptors.requestInterceptor({ url: '/private', headers: { Authorization: null } })
    expect(formatado.headers.Authorization).toEqual('token')
  })
  test('Response', () => {
    const formatado = interceptors.responseInterceptor({ teste: 1 })
    expect(formatado.teste).toEqual(1)
  })
  test('Error Network', () => {
    const formatado = interceptors.errorInterceptor({})
    formatado.catch((err) => {})
    expect(store.getState().user.token).toEqual('token')
  })
  test('Error 400', () => {
    const formatado = interceptors.errorInterceptor({ response: { status: 400 }})
    formatado.catch((err) => {})
    expect(store.getState().user.token).toEqual('token')
  })
  test('Error 401', () => {
    const formatado = interceptors.errorInterceptor({ response: { status: 401 }})
    formatado.catch((err) => {})
    expect(store.getState().user.token).toEqual(null)
  })
})
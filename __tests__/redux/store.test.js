import store from '../../src/redux/store'
import { isAuthenticated, getToken, setData, removeData } from '../../src/redux/modules/user'
import { setApprovedList, setReprovedList, setPendentList } from '../../src/redux/modules/question'

describe('Redux > Store', () => {
  test('User > Initial State', () => {
    expect(isAuthenticated(store.getState().user)).toBeFalsy()
    expect(getToken(store.getState().user)).toEqual('')
  })
  test('User > Set Data', () => {
    store.dispatch(setData({ user: { is_admin: true, login: '' }, token: 'token' }))
    expect(isAuthenticated(store.getState().user)).toBeTruthy()
    expect(getToken(store.getState().user)).toEqual('token')
  })
  test('User > Remove Data Data', () => {
    store.dispatch(removeData())
    expect(isAuthenticated(store.getState().user)).toBeFalsy()
    expect(getToken(store.getState().user)).toEqual(null)
  })
  test('Question > Initial State', () => {
    expect(store.getState().question.pendent).toEqual([])
    expect(store.getState().question.approved).toEqual([])
    expect(store.getState().question.reproved).toEqual([])
  })
  test('Question > Set Pendent List', () => {
    store.dispatch(setPendentList([{}]))
    expect(store.getState().question.pendent.length).toEqual(1)
  })
  test('Question > Set Approved List', () => {
    store.dispatch(setApprovedList([{}]))
    expect(store.getState().question.approved.length).toEqual(1)
  })
  test('Question > Set Reproved List', () => {
    store.dispatch(setReprovedList([{}]))
    expect(store.getState().question.reproved.length).toEqual(1)
  })
})

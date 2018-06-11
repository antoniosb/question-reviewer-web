import React from 'react'
import { MemoryRouter, Route, Redirect } from 'react-router-dom'
import PrivateRoute from '../../src/components/PrivateRoute'
import configureStore from 'redux-mock-store'

function setupComponentTest(token) {
  const mockStore = configureStore()
  const store = mockStore({ user: {
    token,
    perfil: {}
  }})
  return mount(
    <MemoryRouter initialEntries={[ '/' ]}>
      <div>
        <PrivateRoute store={store} path='/' component={() => <h1>COMP</h1>} />
        <Route path='/login' component={() => <h1>Login</h1>} />
      </div>
    </MemoryRouter>)
}

describe('Components > PrivateRoute', () => {
  test('Render', () => {
    const component = setupComponentTest('t')
    expect(component.find(Redirect)).toHaveLength(0)
  })
  test('Render not authenticated', () => {
    const component = setupComponentTest()
    expect(component.find(Redirect)).toHaveLength(1)
  })
})
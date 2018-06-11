import React from 'react'
import { MemoryRouter, Route, Link } from 'react-router-dom'
import AppHeader from '../../src/components/AppHeader'
import configureStore from 'redux-mock-store'

function setupComponentTest(token) {
  const mockStore = configureStore()
  const store = mockStore({ user: {
    token,
    perfil: {}
  }})
  return mount(
    <MemoryRouter><AppHeader store={store} /></MemoryRouter>)
}

describe('Components > AppHeader', () => {
  test('Render', () => {
    const component = setupComponentTest('t')
    expect(component.find(Link)).toHaveLength(1)
  })
  test('Render not authenticated', () => {
    const component = setupComponentTest()
    expect(component.find(Link)).toHaveLength(0)
  })
})
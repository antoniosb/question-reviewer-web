import React from 'react'
import { MemoryRouter, Route, Link } from 'react-router-dom'
import { AuthPage } from '../../src/pages/Auth';
jest.mock('../../src/services/user')
import userService from '../../src/services/user'
import { Button, Form, Alert } from 'antd';

function setupComponentTest(router) {
  const WrappedAuth = Form.create()(AuthPage)
  return mount(<WrappedAuth match={router.match} history={router.history} />)
}

describe('Pages > AuthPage', () => {
  test('Render Login', () => {
    const component = setupComponentTest({
      match: {
        path: '/login'
      }
    })
    component.setProps({
      match: {
        path: '/login'
      }
    })
    expect(component.text().indexOf('Login')).toBeGreaterThan(-1)
    expect(component.find(Button)).toHaveLength(2)
  })
  test('Render SignUp', () => {
    const component = setupComponentTest({
      match: {
        path: '/signUp'
      }
    })
    component.setProps({
      match: {
        path: '/signUp'
      }
    })
    expect(component.text().indexOf('Cadastro de Usuário')).toBeGreaterThan(-1)
    expect(component.find(Button)).toHaveLength(2)
  })
  test('Go SignUp Button', () => {
    const component = setupComponentTest({
      match: {
        path: '/login'
      },
      history: {
        push: (local) => expect(local).toEqual('/signUp')
      }
    })
    component.find(Button).get(1).props.onClick()
  })
  test('Back Button', () => {
    const component = setupComponentTest({
      match: {
        path: '/signUp'
      },
      history: {
        go: (delta) => expect(delta).toEqual(-1)
      }
    })
    component.find(Button).get(0).props.onClick()
  })
  test('Do Login Error Form', () => {
    const component = setupComponentTest({
      match: {
        path: '/login'
      }
    })

    component.find(Form).get(0).props.onSubmit({ preventDefault: () => {} })
    expect(component.text().indexOf('Campo Obrigatório')).toBeGreaterThan(-1)
  })
  test('Do Login Error API', (done) => {
    const component = setupComponentTest({
      match: {
        path: '/login'
      }
    })
    component.instance().setFieldsValue({
      login: 'test',
      password: 'test'
    })

    userService.login.mockImplementation(() => Promise.reject({ response: { status: 401 } }))

    component.find(Form).get(0).props.onSubmit({ preventDefault: () => {} })
    setTimeout(() => {
      component.update()
      expect(component.find(Alert)).toHaveLength(1)
      done()
    })
  })
  test('Do Login Success', (done) => {
    const component = setupComponentTest({
      match: {
        path: '/login'
      },
      history: {
        push: (local) => {
          expect(local).toEqual('/')
          done()
        }
      }
    })
    component.instance().setFieldsValue({
      login: 'test',
      password: 'test'
    })

    userService.login.mockResolvedValue({})

    component.find(Form).get(0).props.onSubmit({ preventDefault: () => {} })
  })
  test('Do SignUp Success', (done) => {
    const component = setupComponentTest({
      match: {
        path: '/signUp'
      },
      history: {
        push: (local) => {
          expect(local).toEqual('/')
          done()
        }
      }
    })
    component.instance().setFieldsValue({
      login: 'test',
      password: 'test'
    })

    userService.signUp.mockResolvedValue({})

    component.find(Form).get(0).props.onSubmit({ preventDefault: () => {} })
  })
})
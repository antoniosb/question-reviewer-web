import React from 'react'
import QuestionTableItem from '../../src/components/QuestionTableItem'
import configureStore from 'redux-mock-store'
import { MemoryRouter, Route } from 'react-router-dom'
import { Button } from 'antd';
import QuestionReproveConfirmation from '../../src/components/QuestionReproveConfirmation';
jest.mock('../../src/services/question')
import questionService from '../../src/services/question'

function setupComponentTest(status, sameId, isAdmin) {
  const userId = 1
  const mockStore = configureStore()
  const store = mockStore({ user: {
    token: 'token',
    perfil: {
      id: userId,
      is_admin: isAdmin
    }
  }})
  return mount(
    <MemoryRouter><div><QuestionTableItem store={store} value={{
      id: 1,
      question_alternatives: [{ is_correct: true }, {}, {}, {}, {}],
      status,
      user: {
        id: sameId ? userId : userId + 1
      }
    }} /><Route path="/questions/1" component={() => <h1>QUESTAO 1</h1>} /></div></MemoryRouter>)
}

describe('Components > QuestionTableItem', () => {
  test('Render - Approved', () => {
    const component = setupComponentTest('A', true, false)
    expect(component.find(Button)).toHaveLength(0)
  })
  test('Render - Pendent - Admin', () => {
    const component = setupComponentTest('P', false, true)
    expect(component.find(Button)).toHaveLength(2)
  })
  test('Render - Pendent - Not Admin', () => {
    const component = setupComponentTest('P', true, false)
    expect(component.find(Button)).toHaveLength(0)
  })
  test('Render - Reproved - Other User', () => {
    const component = setupComponentTest('R', false, true)
    expect(component.find(Button)).toHaveLength(0)
  })
  test('Render - Reproved - Same User', () => {
    const component = setupComponentTest('R', true, false)
    expect(component.find(Button)).toHaveLength(1)
  })
  test('Edit', () => {
    const component = setupComponentTest('R', true, false)
    component.find(Button).simulate('click')
    expect(component.text().indexOf('QUESTAO 1')).toBeGreaterThan(-1)
  })
  test('Open Reprove', () => {
    const component = setupComponentTest('P', false, true)
    component.find(Button).get(1).props.onClick()
    component.update()
    expect(component.find(QuestionReproveConfirmation).get(0).props.visible).toBeTruthy()
  })
  test('Open Reprove Cancel', () => {
    const component = setupComponentTest('P', false, true)
    component.find(Button).get(1).props.onClick()
    component.find(QuestionReproveConfirmation).get(0).props.onCancel()
    component.update()
    expect(component.find(QuestionReproveConfirmation).get(0).props.visible).toBeFalsy()
  })
  test('Open Reprove - DO', (done) => {
    const component = setupComponentTest('P', false, true)
    questionService.reprove.mockResolvedValue({})
    component.find(Button).get(1).props.onClick()
    component.find(QuestionReproveConfirmation).get(0).props.onReprove('teste')
    setTimeout(() => {
      component.update()
      expect(component.find(QuestionReproveConfirmation).get(0).props.visible).toBeFalsy()
      done()  
    }, 100)
  })
  test('Approve', () => {
    const component = setupComponentTest('P', false, true)
    questionService.approve.mockResolvedValue({})
    component.find(Button).get(0).props.onClick()
    setTimeout(() => {
      component.update()
      expect(component.find(QuestionReproveConfirmation).get(0).props.visible).toBeFalsy()
      done()  
    }, 100)
  })
})
import React from 'react'
import { MemoryRouter, Route } from 'react-router-dom'
import QuestionCrud from '../../src/pages/QuestionCrud';
jest.mock('../../src/services/question')
import questionService from '../../src/services/question'
import store from '../../src/redux/store'
import QuestionTable from '../../src/components/QuestionTable';
import { Tabs, Button, Alert, Form } from 'antd';

function setupComponentTest(id) {
  return mount(
  <MemoryRouter initialEntries={[ `/questions/${id}` ]}><div><Route path="/questions" component={() => <h1>QUESTIONS LIST</h1>} /><Route path="/questions/:id" component={() => <QuestionCrud store={store} />} /><Route path="/404" component={() => <h1>404</h1>} /></div></MemoryRouter>)
}

describe('Pages > QuestionCrud', () => {
  test('Render New', () => {
    const component = setupComponentTest('new')
    expect(component.text().indexOf('Cadastro Nova Questão')).toBeGreaterThan(-1)
  })
  test('Render 404', (done) => {
    questionService.get.mockImplementation(() => Promise.reject({ response: { status: 404 }}))
    const component = setupComponentTest('1')
    setTimeout(() => {
      component.update()
      expect(component.text().indexOf('404')).toBeGreaterThan(-1)
      done()
    }, 200)
  })
  test('Render Edit', (done) => {
    questionService.get.mockResolvedValue({
      source: 'source',
      year: 2000,
      content: 'content',
      id: 2,
      question_alternatives: [
        { is_correct: true, content: '1' },
        { is_correct: false, content: '1' },
        { is_correct: false, content: '1' },
        { is_correct: false, content: '1' },
        { is_correct: false, content: '1' },
      ]
    })
    const component = setupComponentTest('2')
    setTimeout(() => {
      component.update()
      expect(component.text().indexOf('Cadastro Questão #2')).toBeGreaterThan(-1)
      done()
    }, 200)
  })
  test('Save Error', (done) => {
    questionService.get.mockResolvedValue({
      source: 'source',
      year: 2000,
      content: 'content',
      id: 2,
      question_alternatives: [
        { is_correct: true, content: '1' },
        { is_correct: false, content: '1' },
        { is_correct: false, content: '1' },
        { is_correct: false, content: '1' },
        { is_correct: false, content: '1' },
      ]
    })
    questionService.save.mockImplementation(() => Promise.reject({ response: { status: 400 }}))
    const component = setupComponentTest('2')
    setTimeout(() => {
      component.find(Form).get(0).props.onSubmit({ preventDefault: () => {} })
      setTimeout(() => {
        component.update()
        expect(component.find(Alert)).toHaveLength(1)
        done()
      }, 200)
    }, 200)
  })
  test('Save OK', (done) => {
    questionService.get.mockResolvedValue({
      source: 'source',
      year: 2000,
      content: 'content',
      id: 2,
      question_alternatives: [
        { is_correct: true, content: '1' },
        { is_correct: false, content: '1' },
        { is_correct: false, content: '1' },
        { is_correct: false, content: '1' },
        { is_correct: false, content: '1' },
      ]
    })
    questionService.save.mockResolvedValue({})
    const component = setupComponentTest('2')
    setTimeout(() => {
      component.find(Form).get(0).props.onSubmit({ preventDefault: () => {} })
      setTimeout(() => {
        component.update()
        expect(component.text().indexOf('QUESTIONS LIST')).toBeGreaterThan(-1)
        done()
      }, 200)
    }, 200)
  })
  test('Back Click', () => {
    const component = setupComponentTest('new')
    component.find(Button).get(0).props.onClick()
    component.update()
    expect(component.text().indexOf('Cadastro Nova Questão')).toBeGreaterThan(-1)
  })
})
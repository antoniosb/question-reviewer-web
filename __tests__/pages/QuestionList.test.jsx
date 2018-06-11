import React from 'react'
import { MemoryRouter, Route } from 'react-router-dom'
import QuestionList from '../../src/pages/QuestionList';
jest.mock('../../src/services/question')
import questionService from '../../src/services/question'
import store from '../../src/redux/store'
import QuestionTable from '../../src/components/QuestionTable';
import { Tabs, Button } from 'antd';

function setupComponentTest() {
  return mount(
    <MemoryRouter><div><QuestionList store={store} /><Route path="/questions/new" component={() => <h1>QUESTAO NOVA</h1>} /></div></MemoryRouter>)
}

describe('Pages > QuestionList', () => {
  test('Render', () => {
    questionService.load.mockResolvedValue({})
    const component = setupComponentTest()
    expect(component.find(QuestionTable)).toHaveLength(1)
  })
  test('New', () => {
    questionService.load.mockResolvedValue({})
    const component = setupComponentTest()
    component.find(Button).simulate('click')
    expect(component.text().indexOf('QUESTAO NOVA')).toBeGreaterThan(-1)
  })
})
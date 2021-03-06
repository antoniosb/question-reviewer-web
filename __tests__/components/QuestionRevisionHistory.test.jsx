import React from 'react'
import QuestionRevisionHistory from '../../src/components/QuestionRevisionHistory'
import { Button, Modal } from 'antd';

function getUpdatedData() {
  const data = new Date(2000, 1, 1)
  return new Date(data.valueOf() + data.getTimezoneOffset() * 60000);
}

describe('Components > QuestionRevisionHistory', () => {
  test('Render Nothing', () => {
    const component = shallow(<QuestionRevisionHistory value={{}} />)

    expect(component).toMatchSnapshot()
  })
  test('Render Nothing empty revisions', () => {
    const component = shallow(<QuestionRevisionHistory value={{ question_revisions: [] }} />)

    expect(component).toMatchSnapshot()
  })
  test('Render', () => {
    const component = shallow(<QuestionRevisionHistory value={{ question_revisions: [{ updated_at: getUpdatedData().toISOString(), comment: 'Test' }] }} />)
    expect(component).toMatchSnapshot()
    component.find(Button).simulate('click')
    expect(component).toMatchSnapshot()
    component.find(Modal).get(0).props.footer[0].props.onClick()
    expect(component).toMatchSnapshot()
  })
})
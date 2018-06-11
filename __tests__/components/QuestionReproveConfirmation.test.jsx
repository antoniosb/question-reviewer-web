import React from 'react'
import { Button, Modal, Input, Form, FormItem } from 'antd'
import QuestionReproveConfirmation from '../../src/components/QuestionReproveConfirmation'
const TextArea = Input.TextArea

function setupComponentTest(events) {
  return mount(<QuestionReproveConfirmation onCancel={events.onCancel} onReprove={events.onReprove} visible={true} value={{ id: 1 }} />)
}

function clickOk(component) {
  const preventDefault = () => {}
  const eventOk = { preventDefault }
  component.find(Modal).get(0).props.onOk(eventOk)
}

describe('Components > QuestionReproveConfirmation', () => {
  test('Render', () => {
    const component = setupComponentTest({})
    expect(component.find(Modal)).toHaveLength(1)
  })
  test('Click OK Validation Error', () => {
    const component = setupComponentTest({})
    clickOk(component)
    expect(component.find(Form.Item).text().indexOf('Campo Obrigatório')).toBeGreaterThan(-1)
  })
  test('Click OK Success', () => {
    const onReprove = () => {}
    const events = { onReprove }
    const spy = spyOn(events, 'onReprove')

    const component = setupComponentTest(events)
    component.instance().setFieldsValue({
      comment: 'Test Business',
    });

    clickOk(component)
    expect(spy).toBeCalled()
  })
})
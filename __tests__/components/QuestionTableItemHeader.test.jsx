import React from 'react'
import QuestionTableItemHeader from '../../src/components/QuestionTableItemHeader'

function getUpdatedData() {
  const data = new Date(2000, 1, 1)
  return new Date(data.valueOf() + data.getTimezoneOffset() * 60000);
}

describe('Components > QuestionTableItemHeader', () => {
  test('Render', () => {
    const component = shallow(<QuestionTableItemHeader item={{
      user: { login: 'teste' },
      id: 1,
      updated_at: getUpdatedData().toISOString()
    }} />)

    expect(component).toMatchSnapshot()
  })
})
import React from 'react'
import QuestionTable from '../../src/components/QuestionTable'

function getUpdatedData() {
  const data = new Date(2000, 1, 1)
  return new Date(data.valueOf() + data.getTimezoneOffset() * 60000);
}

describe('Components > QuestionTable', () => {
  test('Render', () => {
    const component = shallow(<QuestionTable value={[{
      user: { login: 'teste' },
      id: 1,
      updated_at: getUpdatedData().toISOString(),
      question_alternatives: [{},{},{},{},{}]
    }]} />)

    expect(component).toMatchSnapshot()
  })
  test('Render Not Found', () => {
    const component = shallow(<QuestionTable value={[]} />)

    expect(component).toMatchSnapshot()
  })
})
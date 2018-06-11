import React from 'react'
import QuestionTable from '../../src/components/QuestionTable'

describe('Components > QuestionTable', () => {
  test('Render', () => {
    const component = shallow(<QuestionTable value={[{
      user: { login: 'teste' },
      id: 1,
      updated_at: new Date(2000, 11, 1, 12, 1, 1).toISOString(),
      question_alternatives: [{},{},{},{},{}]
    }]} />)

    expect(component).toMatchSnapshot()
  })
  test('Render Not Found', () => {
    const component = shallow(<QuestionTable value={[]} />)

    expect(component).toMatchSnapshot()
  })
})
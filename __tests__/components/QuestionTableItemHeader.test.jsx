import React from 'react'
import QuestionTableItemHeader from '../../src/components/QuestionTableItemHeader'

describe('Components > QuestionTableItemHeader', () => {
  test('Render', () => {
    const component = shallow(<QuestionTableItemHeader item={{
      user: { login: 'teste' },
      id: 1,
      updated_at: new Date(2000, 11, 1, 12, 1, 1).toISOString()
    }} />)

    expect(component).toMatchSnapshot()
  })
})
import React from 'react'
import App from '../../src/pages/App'

describe('Pages > App', () => {
  test('Render', () => {
    const app = shallow(<App />)

    expect(app).toMatchSnapshot()
  })
})
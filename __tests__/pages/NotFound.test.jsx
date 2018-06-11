import React from 'react'
import NotFoundPage from '../../src/pages/NotFound'

describe('Pages > NotFound', () => {
  test('Render', () => {
    const notFound = shallow(<NotFoundPage />)

    expect(notFound).toMatchSnapshot()
    notFound.find('.not-found-page-button').simulate('click')
  })
})
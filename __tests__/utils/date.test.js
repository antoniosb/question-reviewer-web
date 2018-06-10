import formatDateTime from '../../src/utils/date'

describe('Utils > Date', () => {
  test('Format', () => {
    const formatado = formatDateTime(new Date(2000, 10, 1))
    expect(formatado).toEqual('01/11/2000 às 00:00')
  })
})
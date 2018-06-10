import mapStateToProps from '../../src/utils/mapStateToProps'

describe('Utils > Map State', () => {
  test('String Props', () => {
    const formatado = mapStateToProps(['teste'])({ teste: 0 })
    expect(formatado.teste).toEqual(0)
  })
  test('Selector Props', () => {
    const formatado = mapStateToProps([{
      prop: 'teste',
      state: 'user',
      selector: (state) => 0
    }])({ user: { teste: 0 } })
    expect(formatado.teste).toEqual(0)
  })
})
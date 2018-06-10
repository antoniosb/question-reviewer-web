import formConfig from '../../src/utils/formConfig'

describe('Utils > Form Config', () => {
  test('Get', () => {
    const formatado = formConfig({ state: 0 })
    expect(formatado.state).toEqual(0)
    expect(formatado.rules.length).toEqual(1)
  })
  test('Basic', () => {
    const formatado = formConfig()
    expect(formatado.rules.length).toEqual(1)
    expect(Object.getOwnPropertyNames(formatado).length).toEqual(1)
  })
})
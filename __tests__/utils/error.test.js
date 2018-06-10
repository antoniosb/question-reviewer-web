import getApiErrorMessage from '../../src/utils/error'

function mountErrObj(status) {
  if (!status) {
    return {}
  } else {
    return { response: { status }}
  }
}

describe('Utils > Error', () => {
  test('Conflict Error', () => {
    const formatado = getApiErrorMessage('Teste', mountErrObj(409))
    expect(formatado).toEqual('Teste já cadastrado')
  })
  test('Unauthorized Error', () => {
    const formatado = getApiErrorMessage('Teste', mountErrObj(401))
    expect(formatado).toEqual('Credenciais Inválidas')
  })
  test('Bad Request Error', () => {
    const formatado = getApiErrorMessage('Teste', mountErrObj(400))
    expect(formatado).toEqual('Preencha corretamente os dados e tente novamente')
  })
  test('Server Error', () => {
    const formatado = getApiErrorMessage('Teste', mountErrObj())
    expect(formatado).toEqual('Ops! Ocorreu um erro inesperado no servidor')
  })
})
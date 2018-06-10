function getApiErrorMessage(entityName, err) {
  if (err.response) {
    switch (err.response.status) {
      case 409:
        return `${entityName} já cadastrado`
      case 401:
        return 'Credenciais Inválidas'
      default:
        return 'Preencha corretamente os dados e tente novamente'
    }
  } else {
    return 'Ops! Ocorreu um erro inesperado no servidor'
  }
}

export default getApiErrorMessage

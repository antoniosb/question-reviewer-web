function formConfig(others) {
  return Object.assign({
    rules: [{ required: true, message: 'Campo Obrigatório' }]
  }, others || {})
}

export default formConfig

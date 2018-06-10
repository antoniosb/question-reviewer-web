function mapStateToProps(items) {
  return (state) => {
    const obj = {}
    items.forEach(element => {
      if ((typeof element) === 'string') {
        obj[element] = state[element]
      } else {
        obj[element.prop] = element.selector(state[element.state])
      }
    });
    return obj
  }
}

export default mapStateToProps
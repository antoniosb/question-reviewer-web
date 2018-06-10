const SET_APPROVED_LIST = 'SET_APPROVED_LIST'
const SET_REPROVED_LIST = 'SET_REPROVED_LIST'
const SET_PENDENT_LIST = 'SET_PENDENT_LIST'

let initialState = {
  approved: [],
  pendent: [],
  reproved: []
}

export function setApprovedList(data) {
  return {
    type: SET_APPROVED_LIST,
    data
  }
}

export function setReprovedList(data) {
  return {
    type: SET_REPROVED_LIST,
    data
  }
}

export function setPendentList(data) {
  return {
    type: SET_PENDENT_LIST,
    data
  }
}

export default function reducer(state = initialState, action) {
  let obj = null
  switch (action.type) {
    case SET_APPROVED_LIST:
      obj = Object.assign(
        {},
        state,
        {
          approved: action.data
        }
      )
      break
    case SET_REPROVED_LIST:
      obj = Object.assign(
        {},
        state,
        {
          reproved: action.data
        }
      )
      break
    case SET_PENDENT_LIST:
      obj = Object.assign(
        {},
        state,
        {
          pendent: action.data
        }
      )
      break
    default:
      obj = state
      break
  }

  return obj
}
 
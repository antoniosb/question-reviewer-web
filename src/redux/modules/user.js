const SET_DATA = 'SET_DATA'
const REMOVE_DATA = 'REMOVE_DATA'
const USER_STORAGE_KEY = '__QUESTION_DB_USER__'

let initialState = {
  perfil: {},
  token: ''
}

if (window && window.localStorage) {
  const storageInfo = window.localStorage.getItem(USER_STORAGE_KEY)
  if (storageInfo) {
    initialState = JSON.parse(atob(storageInfo))
  }
}

export function setData(data) {
  return {
    type: SET_DATA,
    data
  }
}

export function removeData(data) {
  return {
    type: REMOVE_DATA
  }
}

export default function reducer(state = initialState, action) {
  let obj = null
  switch (action.type) {
    case SET_DATA:
      obj = Object.assign(
        {},
        state,
        {
          perfil: action.data.user,
          token: action.data.token
        }
      )
      break
    case REMOVE_DATA:
      obj = {
        perfil: {},
        token: null
      }
      break
    default:
      obj = state
      break
  }

  if (window && window.localStorage) {
    window.localStorage.setItem(USER_STORAGE_KEY, btoa(JSON.stringify(obj)))
  }
  return obj
}

export const isAuthenticated = (state) => Boolean(state.token)
export const getToken = (state) => state.token
 
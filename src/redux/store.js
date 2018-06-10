import { createStore, combineReducers } from 'redux'
import user from './modules/user'
import question from './modules/question'

const reducer = combineReducers({
  user,
  question
})

const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export default store;

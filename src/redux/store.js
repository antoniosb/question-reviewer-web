import { createStore, combineReducers } from 'redux'
import user from './modules/user'
import question from './modules/question'

const reducer = combineReducers({
  user,
  question
})

const store = createStore(reducer)
export default store;

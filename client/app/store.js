import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'

const initialState = {
	channels: [],
	users: [],
	currentUser: {},
}

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk, logger)
)

export default store

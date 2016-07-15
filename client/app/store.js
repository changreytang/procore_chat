import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'

const logger = createLogger()

const initialState = {
	channels: [],
	users: [],
	currentUser: {},
  messagingClient: {},
}

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk, logger)
)

export default store

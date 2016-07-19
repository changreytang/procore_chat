import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'

// Logger middleware
const logger = createLogger({
  collapsed: () => true,
})

// The initial state of the app
const initialState = {
	channels: [],
	users: [],
	currentUser: {},
  messagingClient: {},
}

// Create the store
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk, logger)
)

export default store

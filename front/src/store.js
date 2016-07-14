import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

const initialState = {
  channels: [],
}

const reducer = (state = initialState, action) => {
  const { type, messagingClient, channels, uniqueName, message } = action
  switch (type) {
    case 'CREATE_MESSAGING_CLIENT':
      return { ...state, messagingClient }
    case 'GET_CHANNELS_SUCCESS':
      return { ...state, channels }
    case 'ACTIVATE_CHANNEL':
      console.log('Activating', uniqueName)
      return {
        ...state,
        channels: state.channels.map(channel => {
          if (channel.uniqueName === uniqueName) {
            return { ...channel, active: true }
          } else {
            return channel
          }
        }),
      }
    case 'SEND_MESSAGE':
      console.log('sending', message)
      state.messagingClient.getChannelByUniqueName(uniqueName)
        .then(channel => channel.sendMessage(message))
      return state
    default:
      return state
  }
}

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store


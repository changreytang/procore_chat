import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

const initialState = {
  channels: [],
}

const reducer = (state = initialState, action) => {
  const {
    type,
    messagingClient,
    channels,
    uniqueName,
    message,
    messages,
  } = action
  switch (type) {
    case 'CREATE_MESSAGING_CLIENT':
      return { ...state, messagingClient }
    case 'GET_CHANNELS_SUCCESS':
      return { ...state, channels }
    case 'GET_MESSAGES_SUCCESS':
      return {
        ...state,
        channels: state.channels.map(channel => {
          if (channel.uniqueName === uniqueName) {
            return { ...channel, messages }
          } else {
            return channel
          }
        }),
      }
    case 'MESSAGE_ADDED':
      return {
        ...state,
        channels: state.channels.map(channel => {
          if (channel.uniqueName === uniqueName) {
            const messages = channel.messages.concat(message)
            return { ...channel, messages }
          } else {
            return channel
          }
        }),
      }
    case 'ACTIVATE_CHANNEL':
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


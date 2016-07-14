import store from './store'

export const createMessagingClient = messagingClient => ({
  type: 'CREATE_MESSAGING_CLIENT',
  messagingClient,
})


export const activateChannel = uniqueName => dispatch => {
  dispatch({ type: 'GET_MESSAGES_REQUEST' })
  store.getState().messagingClient.getChannelByUniqueName(uniqueName)
    .then(channel => {
      channel.on('messageAdded', message => dispatch({
        type: 'MESSAGE_ADDED',
        uniqueName,
        message,
      }))
      return channel.getMessages()
    })
    .then(messages => dispatch({
      type: 'GET_MESSAGES_SUCCESS',
      uniqueName,
      messages,
    }))
  dispatch({
    type: 'ACTIVATE_CHANNEL',
    uniqueName
  })
}

export const sendMessage = (uniqueName, message) => dispatch => {
  dispatch({ type: 'SEND_MESSAGE_REQUEST' })
  store.getState().messagingClient.getChannelByUniqueName(uniqueName)
    .then(channel => channel.sendMessage(message))
}

export const getChannels = () => dispatch => {
  dispatch({ type: 'GET_CHANNELS_REQUEST' })
  store.getState().messagingClient.getChannels().then(channels => {
    dispatch({
      type: 'GET_CHANNELS_SUCCESS',
      channels,
    })
  })
}

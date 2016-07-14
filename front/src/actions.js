import store from './store'

export const createMessagingClient = messagingClient => ({
  type: 'CREATE_MESSAGING_CLIENT',
  messagingClient,
})


export const activateChannel = uniqueName => ({
  type: 'ACTIVATE_CHANNEL',
  uniqueName
})

export const sendMessage = (uniqueName, message) => dispatch => {
  dispatch({ type: 'SEND_MESSAGE_REQUEST' })
  store.getState().messagingClient.getChannelByUniqueName(uniqueName)
    .then(channel => {
      console.log('channel', channel)
      channel.sendMessage(message)
    })
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

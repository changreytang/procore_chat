import { generateUniqueChannelName } from './utils'

export const setMessagingClient = token => {
  const accessManager = new Twilio.AccessManager(token)
  const messagingClient = new Twilio.IPMessaging.Client(accessManager)
	return {
		type: 'SET_MESSAGING_CLIENT',
		messagingClient,
	}
}

export const activateChannel = ( id, name ) => (dispatch, getState) => {

	const uniqueName = generateUniqueChannelName(getState().currentUser.id, id)

	const setupChannel = (channel) => {
		channel.join()
		channel.getMessages().then(messages => dispatch({
      type: 'GET_MESSAGES',
      uniqueName,
      messages,
    }))
		channel.on('messageAdded', message => dispatch({
      type: 'MESSAGE_ADDED',
      uniqueName,
      message,
    }))
		dispatch({ type: 'ACTIVATE_CHANNEL', channel, name })
	}

	getState().messagingClient.getChannelByUniqueName(uniqueName)
		.then(channel => {
			if(!channel) {
        const newChannel = { uniqueName, friendlyName: `${uniqueName} (f)` }
				getState().messagingClient.createChannel(newChannel).then(setupChannel)
			} else {
        const uniqueNames = getState().channels.map(c => c.uniqueName)
        const isChannelActive = uniqueNames.includes(uniqueName)
				if(!isChannelActive) setupChannel(channel)
			}
		})
}

export const closeChannel = uniqueName => ({
	type: 'CLOSE_CHANNEL',
	uniqueName,
})

export const sendMessage = (uniqueName, message) => (dispatch, getState) => {
	getState().messagingClient.getChannelByUniqueName(uniqueName)
		.then(channel => channel.sendMessage(message))
    .then(() => dispatch({ type: 'SEND_MESSAGE', message }))
}

export const getUsers = users => ({
    type: 'GET_USERS',
    users,
})

export const getCurrentUser = currentUser => ({
	type: 'GET_CURRENT_USER',
	currentUser,
})

import store from './store'
import { generateUniqueChannelName } from './utils'

export const setMessagingClient = token => {
  const accessManager = new Twilio.AccessManager(token)
  const messagingClient = new Twilio.IPMessaging.Client(accessManager)
	return {
		type: 'SET_MESSAGING_CLIENT',
		messagingClient,
	}
}

export const activateChannel = id => dispatch => {

	const uniqueName = generateUniqueChannelName(store.getState().currentUser.id, id)

	const setupChannel = channel => {
		channel.join()
		channel.getMessages().then(messages =>
			dispatch(getMessages(uniqueName, messages)))
		channel.on('messageAdded', message =>
			dispatch(messageAdded(uniqueName, message)))
		dispatch({ type: 'ACTIVATE_CHANNEL', channel })
	}

	store.getState().messagingClient.getChannelByUniqueName(uniqueName)
		.then(channel => {
			if(!channel) {
				store.getState().messagingClient.createChannel({
					uniqueName,
					friendlyName: `${uniqueName} (friendly)`,
				}).then(setupChannel)
			} else {
				setupChannel(channel)
			}
		})
}

export const toggleExpand = uniqueName => ({
	type: 'TOGGLE_EXPAND',
	uniqueName,
})

export const closeChannel = uniqueName => ({
	type: 'CLOSE_CHANNEL',
	uniqueName,
})

export const messageAdded = (uniqueName, message) => ({
	type: 'MESSAGE_ADDED',
	uniqueName,
	message,
})

export const getMessages = (uniqueName, messages) => ({
	type: 'GET_MESSAGES',
	uniqueName,
	messages,
})

export const sendMessage = (uniqueName, message) => {
	store.getState().messagingClient.getChannelByUniqueName(uniqueName)
		.then(channel => channel.sendMessage(message))
}

export const getUsers = users => {
	return {
	type: 'GET_USERS',
	users,
}
}

export const getCurrentUser = currentUser => ({
	type: 'GET_CURRENT_USER',
	currentUser,
})

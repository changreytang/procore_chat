import store from './store'
import messagingClient from './twilio'
import { generateUniqueChannelName } from './utils'

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

	messagingClient.getChannelByUniqueName(uniqueName)
		.then(channel => {
			if(!channel) {
				messagingClient.createChannel({
					uniqueName,
					friendlyName: `${uniqueName} (friendly)`,
				}).then(setupChannel)
			} else {
				setupChannel(channel)
			}
		})
}

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

export const sendMessage = (uniqueName, message)  => {
	messagingClient.getChannelByUniqueName(uniqueName)
		.then(channel => channel.sendMessage(message))
}

export const getChannels = () => dispatch => {
	messagingClient.getChannels()
		.then(channels => {
			dispatch({
				type: 'GET_CHANNELS',
				channels,
			})
		})
}

export const getUsers = users => ({
	type: 'GET_USERS',
	users,
})

export const getCurrentUser = currentUser => ({
	type: 'GET_CURRENT_USER',
	currentUser,
})

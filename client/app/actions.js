import store from './store'
import { generateUniqueChannelName } from './utils'

export const createMessagingClient = messagingClient => ({
	type: 'CREATE_MESSAGING_CLIENT',
	messagingClient,
})


export const activateChannel = id => dispatch => {

	const uniqueName = generateUniqueChannelName(store.getState().currentUser.id, id)

	const setupChannel = channel => {
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
		dispatch({
			type: 'ACTIVATE_CHANNEL',
			channel
		})
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



export const sendMessage = (uniqueName, message) => dispatch => {
	store.getState().messagingClient.getChannelByUniqueName(uniqueName)
		.then(channel => channel.sendMessage(message))
}

export const getChannels = () => dispatch => {
	store.getState().messagingClient.getChannels()
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

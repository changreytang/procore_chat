import store from './store'

export
const createMessagingClient = messagingClient => ({
	type: 'CREATE_MESSAGING_CLIENT',
	messagingClient,
})


export
const activateChannel = uniqueName => dispatch => {

	store.getState().messagingClient.getChannelByUniqueName(uniqueName)
		.then(channel => {
			channel.on('messageAdded', message => dispatch({
				type: 'MESSAGE_ADDED',
				uniqueName,
				message,
			}))
			return channel.getMessages()
		})
		.then(messages => {
			dispatch({
				type: 'GET_MESSAGES',
				uniqueName,
				messages,
			})
		})

	dispatch({
		type: 'ACTIVATE_CHANNEL',
		uniqueName
	})

}

export
const sendMessage = (uniqueName, message) => dispatch => {
	store.getState().messagingClient.getChannelByUniqueName(uniqueName)
		.then(channel => channel.sendMessage(message))
}

export
const getChannels = () => dispatch => {
	store.getState().messagingClient.getChannels()
		.then(channels => {
			dispatch({
				type: 'GET_CHANNELS',
				channels,
			})
		})
}

export
const getUsers = users => ({
	type: 'GET_USERS',
	users,
})
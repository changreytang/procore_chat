import store from './store'

const generateUniqueChannelName = (id1, id2) =>
	id1 < id2 ? `${id1}:${id2}` : `${id2}:${id1}`

export
const createMessagingClient = messagingClient => ({
	type: 'CREATE_MESSAGING_CLIENT',
	messagingClient,
})


export
const activateChannel = id => dispatch => {

	const uniqueName = generateUniqueChannelName(store.getState().currentUser.id, id)
	console.log(uniqueName)
	const setupChannel = channel => {
		channel.join()
		channel.on('messageAdded', message => dispatch({
			type: 'MESSAGE_ADDED',
			uniqueName,
			message,
		}))
	}
	

	store.getState().messagingClient.getChannelByUniqueName(uniqueName)
		.then(channel => {
			if(!channel) {
				store.getState().messagingClient.createChannel({
					uniqueName,
					friendName: uniqueName,
				}).then(setupChannel)
			}
			else {
				setupChannel(channel)
			}
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

export 
const getCurrentUser = currentUser => ({
	type: 'GET_CURRENT_USER',
	currentUser,
})
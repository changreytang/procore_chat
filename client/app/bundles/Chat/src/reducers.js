const initialState = {
	channels: [],
	users: [],
	currentUser: {},
}


const reducer = (state = initialState, action) => {
	const {
		type,
		messagingClient,
		currentUser,
		users,
		id,
		uniqueName,
		message,
		messages,
	} = action
	switch (type) {
		case 'CREATE_MESSAGING_CLIENT':
			return {...state, messagingClient
			}
		case 'GET_USERS':
			return {...state, users
			}
		case 'GET_CURRENT_USER':
			return {...state, currentUser
			}
		case 'GET_MESSAGES':
			return {
					...state,
					users: state.users.map(user => {
					if (channel.uniqueName === uniqueName) {
						return {...channel, messages
						}
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
						return {...channel, messages
						}
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
						return {...channel, active: true
						}
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

export
default reducer
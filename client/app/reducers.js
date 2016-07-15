import { generateUniqueChannelName } from './utils'

export default (state, action) => {
	let channels
	const { type, currentUser, users, uniqueName, channel,
		      message, messages, messagingClient } = action

	switch (type) {
		case 'SET_MESSAGING_CLIENT':
			return { ...state, messagingClient }
		case 'GET_USERS':
			return { ...state, users }
		case 'GET_CURRENT_USER':
			return { ...state, currentUser }
		case 'TOGGLE_EXPAND':
			console.log('toggle', uniqueName)
			channels = state.channels.map(channel => {
				if (channel.uniqueName === uniqueName) {
					return { ...channel, expanded: !channel.expanded }
				} else {
					return channel
				}
			})
			return { ...state, channels }
		case 'GET_MESSAGES':
			channels = state.channels.map(channel => {
				if (channel.uniqueName === uniqueName) {
					return { ...channel, messages }
				} else {
					return channel
				}
			})
			return { ...state, channels }
		case 'MESSAGE_ADDED':
			channels = state.channels.map(channel => {
				if (channel.uniqueName === uniqueName) {
					const messages = channel.messages.concat(message)
					return {...channel, messages }
				} else {
					return channel
				}
			})
			return { ...state, channels }
		case 'ACTIVATE_CHANNEL':
			channels = state.channels.concat(channel)
			return { ...state, channels }
		case 'CLOSE_CHANNEL':
			channels = state.channels.filter(channel => channel.uniqueName != uniqueName)
			return { ...state, channels }
		default:
			return state
	}
}

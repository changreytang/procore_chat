import { generateUniqueChannelName } from './utils'

export default (state, action) => {
	let channels, _users
	const { type, currentUser, users, uniqueName, name, channel,
		      message, messages, messagingClient, identity } = action

	switch (type) {
		case 'SET_MESSAGING_CLIENT':
			return { ...state, messagingClient }
		case 'GET_USERS':
			return { ...state, users }
		case 'GET_CURRENT_USER':
			return { ...state, currentUser }
		case 'ACTIVATE_CHANNEL':
			channels = state.channels.concat({...channel, name})
			return { ...state, channels }
		case 'CLOSE_CHANNEL':
			channels = state.channels.filter(c => c.uniqueName != uniqueName)
			return { ...state, channels }
    case 'USER_ONLINE':
      _users = state.users.map(user => {
        if (user.name === identity) {
          return { ...user, online: true }
        } else {
          return user
        }
      })
      return { ...state, users: _users }
    case 'USER_OFFLINE':
      _users = state.users.map(user => {
        if (user.name === identity) {
          return { ...user, online: false }
        } else {
          return user
        }
      })
      return { ...state, users: _users }
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
		default:
			return state
	}
}

import { generateUniqueChannelName } from './utils'

export default (state, action) => {
  let channels, users
  const { input, type, currentUser, uniqueName, name, channel, online,
          message, messages, messagingClient, identity, userActivated, unread, id } = action

  switch (type) {
    case 'SET_MESSAGING_CLIENT':
      return { ...state, messagingClient }
    case 'GET_CURRENT_USER':
      return { ...state, currentUser }
    case 'GET_USERS':
      users = action.users.map(user => {
        return { ...user, unread: false }
      })
      return { ...state, users }
    case 'ACTIVATE_CHANNEL':
      const newChannel = {...channel, name, expanded: userActivated }
      if((window.innerWidth - 450) > document.getElementById('channels').offsetWidth)
        channels = state.channels.concat(newChannel)
      else {
        channels = state.channels.slice(0, state.channels.length - 1).concat(newChannel)
      }
      return { ...state, channels }
    case 'CLOSE_CHANNEL':
      channels = state.channels.filter(c => c.uniqueName != uniqueName)
      return { ...state, channels }
    case 'UPDATE_UNREAD':
      users = state.users.map(user => {
        if (user.id.toString() === id) {
          return { ...user, unread }
        } else {
          return user
        }
      })
      return { ...state, users }
    case 'TOGGLE_EXPAND':
      channels = state.channels.map(channel => {
        if (channel.uniqueName === uniqueName) {
          const expanded = !channel.expanded
          return { ...channel, expanded }
        } else {
          return channel
        }
      })
      return { ...state, channels }
    case 'SEARCH_USERS':
      return {...state, userListSearchQuery: input}
    case 'UPDATE_STATUS':
      users = state.users.map(user => {
        if (user.id.toString() === identity) {
          return { ...user, online }
        } else {
          return user
        }
      })
      return { ...state, users }
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

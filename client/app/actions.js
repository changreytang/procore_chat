import { generateUniqueChannelName } from './utils'

// The initial setup of the messaging client, along with some event listeners
export const setupMessagingClient = token => (dispatch, getState) => {
  const accessManager = new Twilio.AccessManager(token)
  const messagingClient = new Twilio.IPMessaging.Client(accessManager)
  dispatch({ type: 'SET_MESSAGING_CLIENT', messagingClient })

  // Open a new chat box when someone messages you
  messagingClient.on('messageAdded', message => {
    const ownMessage = message.author === getState().currentUser.id.toString()
    if (!ownMessage) {
      const authorUser = getState().users
        .find(user => user.id.toString() === message.author)
      const { id, name } = authorUser
      dispatch(activateChannel(id, name))
    }
  })

  // Update the online indicators of the other users on changes
  messagingClient.on('userInfoUpdated', ({ online, identity }) => {
    const user = getState().users.find(user => user.id.toString() === identity)
    if (user) {
      const wasOnline = !!user.online
      const currentlyOnline = !!online
      if (currentlyOnline != wasOnline) {
        dispatch({ type: 'UPDATE_STATUS', identity, online: currentlyOnline })
      }
    }
  })
}

// open up a new chat box
export const activateChannel = ( id, name ) => (dispatch, getState) => {
  // construct the unique name for the channel
  const uniqueName = generateUniqueChannelName(getState().currentUser.id, id)

  // This function joins a given channel and sets up event listeners
  const setupChannel = channel => {
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

  // If a channel exists, join it. Otherwise create it
	getState().messagingClient.getChannelByUniqueName(uniqueName)
		.then(channel => {
			if(!channel) {
        const newChannel = { uniqueName, friendlyName: `${uniqueName} (f)` }
				getState().messagingClient
          .createChannel(newChannel) .then(channel => {
            channel.join()
            channel.add(id.toString())
            setupChannel(channel)
          })
			} else {
        const uniqueNames = getState().channels.map(c => c.uniqueName)
        const isChannelActive = uniqueNames.includes(uniqueName)
				if (!isChannelActive) setupChannel(channel)
			}
		})
}

export const searchUsers = input => ({
  type: 'SEARCH_USERS',
  input,
})

// close an open chat box
export const closeChannel = uniqueName => ({
	type: 'CLOSE_CHANNEL',
	uniqueName,
})

// Send a new message
export const sendMessage = (uniqueName, message) => (dispatch, getState) => {
	getState().messagingClient.getChannelByUniqueName(uniqueName)
		.then(channel => channel.sendMessage(message))
    .then(() => dispatch({ type: 'SEND_MESSAGE', message }))
}

// Set the user list
export const getUsers = users => ({
    type: 'GET_USERS',
    users,
})

// Set the current user
export const getCurrentUser = currentUser => ({
	type: 'GET_CURRENT_USER',
	currentUser,
})

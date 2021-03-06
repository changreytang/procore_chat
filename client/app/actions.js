import { generateUniqueChannelName, findOtherId } from './utils'

// The initial setup of the messaging client, along with some event listeners
export const setupMessagingClient = token => (dispatch, getState) => {
  const accessManager = new Twilio.AccessManager(token)
  const messagingClient = new Twilio.IPMessaging.Client(accessManager)
  dispatch({ type: 'SET_MESSAGING_CLIENT', messagingClient })

  // Join the big general channel so that we can all get online statuses
  messagingClient.getChannelByUniqueName('general').then(channel => channel.join())
  messagingClient.getChannels().then(channels => {dispatch(setupUnread(channels))})

  // messagingClient.getChannels()
  //   .then(channels => channels.forEach(channel => {
  //     if (channel.status === 'joined') {
  //       dispatch(updateUnread(channel.uniqueName))
  //     }
  //   }))
  // Open a new chat box when someone messages you
  messagingClient.on('messageAdded', message => {
    const ownMessage = message.author === getState().currentUser.id.toString()
    if (!ownMessage) {
      const authorUser = getState().users
        .find(user => user.id.toString() === message.author)
      const { id, name } = authorUser
      dispatch(activateChannel(id, name, false))
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

export const setupUnread = channels => (dispatch, getState) => {
  channels.forEach(channel => {
    if (channel.status === 'joined') {
      const id = findOtherId(channel.uniqueName)
      channel.getMessages()
        .then(messages => {
          let unread = false
          const newestMessageIndex = messages.length ?
            messages[messages.length - 1].index : 0
          const lastReadIndex = channel.lastConsumedMessageIndex
          if ((newestMessageIndex - lastReadIndex) != 0) { unread = true }
          dispatch({ type: 'UPDATE_UNREAD', id, unread })
        })
    }
  })
}

// Update the number of unread messages in a channel
export const updateUnread = (uniqueName, unread) => (dispatch, getState) => {
  const id = findOtherId(uniqueName)
  dispatch({ type: 'UPDATE_UNREAD', id, unread })
}

// tell Twilio that we've seen all the messages in this convo
export const updateLastConsumedMessageIndex = uniqueName => (dispatch, getState) => {
  const id = findOtherId(uniqueName)
  getState().messagingClient
    .getChannelByUniqueName(uniqueName)
    .then(channel => {
      const newestMessage = channel.messages.length ?
        channel.messages[channel.messages.length - 1].index : 0
      channel.updateLastConsumedMessageIndex(newestMessage)
      console.log("UPDATED", newestMessage, channel.lastConsumedMessageIndex)
      dispatch({ type: 'UPDATE_CONSUMED', newestMessage })
    })
}

// open up a new chat box
export const activateChannel = ( id, name, userActivated ) => (dispatch, getState) => {
  // construct the unique name for the channel
  const uniqueName = generateUniqueChannelName(getState().currentUser.id, id)

  // This function joins a given channel and sets up event listeners
  const setupChannel = channel => {
    channel.join() // TODO this is called every time a channel is opened, which is redundant
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
    dispatch({ type: 'ACTIVATE_CHANNEL', channel, name, userActivated })
  }

  // If a channel exists, join it. Otherwise create it
  getState().messagingClient.getChannelByUniqueName(uniqueName)
    .then(channel => {
      if(!channel) {
        const friendlyName = `${uniqueName} (f)`
        const isPrivate = true
        const newChannel = { uniqueName, friendlyName, isPrivate }
        getState().messagingClient
          .createChannel(newChannel)
          .then(channel => {
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

export const toggleExpand = uniqueName => ({
  type: 'TOGGLE_EXPAND',
  uniqueName,
})

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
  console.log('sending', message)
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

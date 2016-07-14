import store from './store'
import { getChannels, createMessagingClient } from './actions'

const initTwilio = () => {
  fetch(`/token`, { credentials: 'same-origin' })
    .then(response => response.json())
    .then(({ identity, token }) => {

      const accessManager = new Twilio.AccessManager(token)
      const messagingClient = new Twilio.IPMessaging.Client(accessManager)
      store.dispatch(createMessagingClient(messagingClient))

      messagingClient.getChannelByUniqueName('general').then(channel => {
        let generalChannel = channel

        if (!generalChannel) {
          const [ uniqueName, friendlyName ] = [ 'general', 'General Convo' ]
          messagingClient.createChannel({ uniqueName, friendlyName })
            .then(channel => generalChannel = channel)
        }

        generalChannel.join()
      })

      messagingClient.on('channelAdded', () => store.dispatch(getChannels()))
      messagingClient.on('channelRemoved', () => store.dispatch(getChannels()))
      messagingClient.on('channelUpdated', () => store.dispatch(getChannels()))
      store.dispatch(getChannels())
    })
}

export default initTwilio

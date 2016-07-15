import store from './store'
import { getChannels, createMessagingClient } from './actions'

const initTwilio = token => {
  const accessManager = new Twilio.AccessManager(token)
  const messagingClient = new Twilio.IPMessaging.Client(accessManager)

  store.dispatch(createMessagingClient(messagingClient))
  store.dispatch(getChannels())
}

export default initTwilio

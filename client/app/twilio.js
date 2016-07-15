import store from './store'
import { getChannels, createMessagingClient } from './actions'

let messagingClient

export const initTwilio = token => {
  const accessManager = new Twilio.AccessManager(token)
  messagingClient = new Twilio.IPMessaging.Client(accessManager)

  store.dispatch(getChannels())
}

export default messagingClient

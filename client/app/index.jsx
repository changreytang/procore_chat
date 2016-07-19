import React from 'react'
import ReactOnRails from 'react-on-rails'
import { Provider } from 'react-redux'
import UserList from 'components/UserList'
import ChannelList from 'components/ChannelList'
import store from 'store'
import { getUsers, getCurrentUser, setupMessagingClient } from 'actions'
require('stylesheets/index.scss')

const ChatAppClient = ({ token, users, currentUser }) => {
  store.dispatch(getUsers(users))
  store.dispatch(getCurrentUser(currentUser))
  store.dispatch(setupMessagingClient(token))
  return (
    <Provider store={store}>
      <div id="chat">
        <ChannelList />
        <UserList/>
      </div>
    </Provider>
  )
}

// Tell Rails about the React app
ReactOnRails.register({ ChatAppClient })

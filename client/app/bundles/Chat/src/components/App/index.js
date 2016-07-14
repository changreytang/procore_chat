import React from 'react'
import { connect } from 'react-redux'
import UserList from '../UserList'
import Channel from '../Channel'

const App = ({ channels }) =>
  <div className="chat">
    <UserList/>
    {
      channels
        .map((channel, i) => <Channel key={i} { ...channel } />)
    }
  </div>

const mapStateToProps = ({ channels }) => ({ channels })

export default connect(mapStateToProps)(App)

import React from 'react'
import { connect } from 'react-redux'
import ChannelList from '../ChannelList'
import Channel from '../Channel'

const App = ({ channels }) =>
  <div className="chat">
    <ChannelList channels={channels} />
    {
      channels
        .filter(({ active }) => !!active)
        .map((channel, i) => <Channel key={i} { ...channel } />)
    }
  </div>

const mapStateToProps = ({ channels }) => ({ channels })

export default connect(mapStateToProps)(App)

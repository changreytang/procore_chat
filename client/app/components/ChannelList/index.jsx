import React, { PropTypes } from 'react'
import Channel from 'components/Channel'
import { connect } from 'react-redux'

const ChannelList = ({ channels }) =>
  <div id="channels">
    {channels.map(channel => <Channel key={channel.uniqueName} { ...channel } />)}
  </div>

ChannelList.propTypes = {
  channels: PropTypes.array.isRequired,
}

const mapStateToProps = ({ channels }) => ({ channels })

export default connect(mapStateToProps)(ChannelList)

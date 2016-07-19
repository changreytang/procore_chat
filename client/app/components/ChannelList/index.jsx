import React, { PropTypes } from 'react'
import Channel from 'components/Channel'
import { connect } from 'react-redux'

const ChannelList = ({ channels }) =>
  <div id="channels">
    {channels.map((channel, i) => <Channel key={i} { ...channel } />)}
  </div>

ChannelList.propTypes = {
  channels: PropTypes.array.isRequired,
}

const mapStateToProps = ({ channels }) => ({ channels })

export default connect(mapStateToProps)(ChannelList)

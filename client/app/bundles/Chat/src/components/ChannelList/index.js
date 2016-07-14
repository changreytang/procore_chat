import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { activateChannel } from '../../actions'

const ChannelList = ({ channels, activateChannel }) =>
  <div className="channelList border">
    <ul>
      {channels.map(({ uniqueName, friendlyName }) =>
        <li key={uniqueName} onClick={() => activateChannel(uniqueName)}>
          {friendlyName}
        </li>
      )}
    </ul>
    <h4>Channels ({channels.length})</h4>
  </div>


export default connect(
  state => state,
  { activateChannel }
)(ChannelList)

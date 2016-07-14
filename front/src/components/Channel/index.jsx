import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { sendMessage } from '../../actions'

const Channel = ({ friendlyName, uniqueName }) =>
  <div className="channel border">
    <label>
      <b>{friendlyName}</b>
      <input type="checkbox" className="checkbox" />
      <div>
        <ul>
        </ul>
        <input
          type="text"
          className="messageInput"
          onKeyPress={({ target, key }) => {
            if (key === 'Enter') {
              sendMessage(uniqueName, target.value)
              target.value = ''
            }
          }}
        />
      </div>
    </label>
  </div>

export default connect(
  state => state,
  { sendMessage }
)(Channel)

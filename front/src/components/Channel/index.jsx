import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { sendMessage } from '../../actions'

const Channel = ({ friendlyName, uniqueName, messages, sendMessage }) =>
  <div className="channel border">
    <label>
      <b>{friendlyName}</b>
      <input type="checkbox" className="checkbox" />
      <div>
        <ul>
          {
            messages.map(({ index, body, author }) =>
              <li key={index}><b>{author}</b>: {body}</li>
            )
          }
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

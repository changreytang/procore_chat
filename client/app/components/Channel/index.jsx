import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { sendMessage, closeChannel, toggleExpand } from '../../actions'

const Channel = ({ name, toggleExpand, expanded, uniqueName, messages, closeChannel }) =>
  <div className="channel border">
    <b onClick={() => toggleExpand(uniqueName)}>{name}</b>
    <i className="material-icons" onClick={() => closeChannel(uniqueName)}>close</i>
    {
      expanded ?
        <div>
          <ul>
            {messages.map(({ index, body, author }) =>
              <li key={index}><b>{author}</b>: {body}</li>
            )}
          </ul>
          <input
            type="text"
            className="messageInput"
            onKeyPress={({ target, key }) => {
              if (key === 'Enter') {
                const message = target.value
                target.value = ''
                sendMessage(uniqueName, message)
              }
            }}
          />
        </div> : null
    }
  </div>

const mapStateToProps = ({ channels }, { uniqueName }) => {
  const channel = channels.find(c => c.uniqueName === uniqueName)
  return { ...channel }
}

export default connect(
  mapStateToProps,
  { closeChannel, toggleExpand }
)(Channel)

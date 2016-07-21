import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { sendMessage, closeChannel, toggleExpand, updateLastConsumedMessageIndex, updateUnread } from 'actions'
import { findOtherId } from 'utils'

class Channel extends Component {
  constructor(props) {
    super(props)
  }
  componentDidUpdate() {
    if (this.props.expanded) {
      this.refs.messages.scrollTop = this.refs.messages.scrollHeight
      this.props.updateLastConsumedMessageIndex(this.props.uniqueName)
      // const id = findOtherId(this.props.uniqueName)
      // this.props.updateUnread(id)
    }
  }
  render() {
    const { currentUser, toggleExpand, expanded, sendMessage, closeChannel, uniqueName, name, messages } = this.props
    const className = author => currentUser.id.toString() === author ? 'me' : 'other'
    return (
      <div className="channel">
        <div className="top">
          <div className="name" onClick={() => toggleExpand(uniqueName)}>
            {name}
          </div>
          <i className="fa fa-times" onClick={() => closeChannel(uniqueName)} />
        </div>
        {expanded ?
          <div>
            <div ref="messages" className="messages">
              {messages.map(({ index, body, author }) =>
                <div key={index}>
                  <div className={`message ${className(author)}`}>
                    <span>{body}</span>
                  </div>
                </div>
              )}
            </div>
            <textarea id="userInput"
              className="messageInput"
              onKeyUp={({ target, key, shiftKey }) => {
                if (key === 'Enter' && !shiftKey) {
                  const newStr = target.value.trim()
                  if(newStr.length != 0) {
                    sendMessage(uniqueName, newStr)
                  }
                  target.value = ''
                }
                target.style.height = '5px'
                target.style.height = `${target.scrollHeight}px`
              }}
            />
          </div> : null
        }
      </div>
    )
  }
}

Channel.propTypes = {
  currentUser:  PropTypes.object.isRequired,
  sendMessage:  PropTypes.func.isRequired,
  closeChannel: PropTypes.func.isRequired,
  uniqueName:   PropTypes.string.isRequired,
  name:         PropTypes.string.isRequired,
  messages:     PropTypes.array.isRequired,
}

const mapStateToProps = ({ channels, currentUser }, { uniqueName }) => {
  const channel = channels.find(c => c.uniqueName === uniqueName)
  return { ...channel, currentUser }
}

export default connect(
  mapStateToProps,
  { closeChannel, toggleExpand, sendMessage, updateLastConsumedMessageIndex, updateUnread }
)(Channel)

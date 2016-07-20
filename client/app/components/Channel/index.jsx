import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { sendMessage, closeChannel, toggleExpand } from 'actions'

class Channel extends Component {
  constructor(props) {
    super(props)
    this.state = { expanded: true }
    this.toggleExpand = this.toggleExpand.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  componentDidUpdate() {
    if (this.state.expanded) {
      this.refs.messages.scrollTop = this.refs.messages.scrollHeight
    }
  }
  handleClose() {
    const { closeChannel, uniqueName } = this.props
    closeChannel(uniqueName)
  }
  toggleExpand() {
    const expanded = !this.state.expanded
    this.setState({ expanded })
  }
  render() {
    const { currentUser, sendMessage, closeChannel, uniqueName, name,
            messages } = this.props
    const { expanded } = this.state
    const className = author => currentUser.id.toString() === author ? 'me' : 'other'
    return (
      <div className="channel">
        <div className="top">
          <div className="name" onClick={this.toggleExpand}>{name}</div>
          <i className="fa fa-times" onClick={this.handleClose}></i>
        </div>
        {
          expanded ?
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
                className="messageInput" onKeyUp={() => auto_grow()}
                onKeyPress={({ target, key }) => {
                  if (key === 'Enter') {
                    sendMessage(uniqueName, target.value)
                    target.value = ''
                  }
                }}
              />
            </div> : null
        }
      </div>
    )
  }
}


function auto_grow() {
    document.getElementById("userInput").style.height = "5px";
    document.getElementById("userInput").style.height = (document.getElementById("userInput").scrollHeight)+"px";
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
  { closeChannel, toggleExpand, sendMessage }
)(Channel)

import React, { Component } from 'react'
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
    this.props.closeChannel(this.props.uniqueName)
  }
  toggleExpand() {
    this.setState({ expanded: !this.state.expanded })
  }
  render() {
    const { currentUser, sendMessage, closeChannel, uniqueName, name, messages } = this.props
    const { expanded } = this.state
    const className = author => currentUser.name === author ? 'me' : 'other'
    return (
      <div className="channel">
        <div className="top">
          <b onClick={this.toggleExpand}>{name}</b>
          <i className="material-icons" onClick={this.handleClose}>close</i>
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
            </div> : null
        }
      </div>
    )
  }
}

const mapStateToProps = ({ channels, currentUser }, { uniqueName }) => {
  const channel = channels.find(c => c.uniqueName === uniqueName)
  return { ...channel, currentUser }
}

export default connect(
  mapStateToProps,
  { closeChannel, toggleExpand, sendMessage }
)(Channel)

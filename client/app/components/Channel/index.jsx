import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sendMessage, closeChannel, toggleExpand } from '../../actions'

class Channel extends Component {
  constructor(props) {
    super(props)
    this.state = { expanded: true }
    this.toggleExpand = this.toggleExpand.bind(this)
  }
  componentDidUpdate() {
    if (this.state.expanded) {
      this.refs.messages.scrollTop = this.refs.messages.scrollHeight
    }
  }
  toggleExpand() {
    this.setState({ expanded: !this.state.expanded })
  }
  render() {
    const { currentUser } = this.props
    return (
      <div className="channel border">
        <div className="top">
          <b onClick={() => this.toggleExpand()}>{this.props.name}</b>
          <i className="material-icons" onClick={() => this.props.closeChannel(this.props.uniqueName)}>close</i>
        </div>
        {
          this.state.expanded ?
            <div>
              <div ref="messages" className="messages">
                {this.props.messages.map(({ index, body, author }) =>
                  <div key={index}>
                    <div className={`message ${currentUser.name === author ? 'me' : 'other'}`}>
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
                    sendMessage(this.props.uniqueName, target.value)
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
  { closeChannel, toggleExpand }
)(Channel)

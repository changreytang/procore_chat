import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { activateChannel, searchUsers } from 'actions'

class UserList extends Component {
  constructor(props) {
    super(props) 
    this.state = { expanded: false }
    this.toggleExpand = this.toggleExpand.bind(this)
  }
  toggleExpand() {
    const expanded = !this.state.expanded
    this.setState({ expanded })
  }
  render() {
    const { users, activateChannel, numOnline, searchUsers } = this.props 
    const { expanded } = this.state 
    return (
      <div id="channelList">
        {
          expanded ?
            <div>
              <div id="list">
                {users.filter(user => user.online).map(({ id, name}) =>
                  <div
                    key={id}
                    onClick={() => activateChannel(id, name)}
                    className="user"
                  >
                    <div>{name}</div>
                    <div className="on" />
                  </div>
                )}
                {users.filter(user => !user.online).map(({ id, name}) =>
                  <div
                    key={id}
                    onClick={() => activateChannel(id, name)}
                    className="user"
                  >
                    <div>{name}</div>
                    <div className="off"/>
                  </div>
                )}
              </div>
              <input
                type="text"
                className="messageInput"
                onChange={({ target }) => {
                  searchUsers(target.value)
                }}
              />
            </div> : null
        } 
        <div id="listLabel" onClick={ this.toggleExpand }>
          <i className="fa fa-comments"></i>
          <b>Chat ({numOnline} Online)</b>
        </div>
      </div>
    )
  }
}

UserList.propTypes = {
  users:           PropTypes.array.isRequired,
  activateChannel: PropTypes.func.isRequired,
  searchUsers:     PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  const reg = new RegExp(state.userListSearchQuery, 'i')
  const users = state.users.filter(user => reg.test(user.name))
  const numOnline = state.users.filter(user => user.online).length
  return { users, numOnline }
}

export default connect(
  mapStateToProps,
  { activateChannel, searchUsers }
)(UserList)

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { activateChannel, searchUsers } from 'actions'
import { generateUniqueChannelName } from 'utils'

class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = { expanded: false }
  }
  render() {
    const { activateChannel, searchUsers, users, numOnline } = this.props
    const expanded = !this.state.expanded
    const onlineUsers = users.filter(user => user.online)
    const offlineUsers = users.filter(user => !user.online)
    const sortedUsers = [...onlineUsers, ...offlineUsers]
    return (
      <div id="channelList">
        {this.state.expanded ?
          <div>
            <div id="list">
              {sortedUsers.map(({ id, name, online, unread }) =>
                <div key={id} onClick={() => activateChannel(id, name, true)}>
                  <div>{name} ({unread})</div>
                  <div className={online ? 'on' : 'off'} />
                </div>
              )}
            </div>
            <div id="userSearchArea">
              <i className="fa fa-search"></i>
              <input onChange={e => searchUsers(e.target.value)} />
            </div>
          </div> : null
        }
        <div id="listLabel" onClick={() => this.setState({ expanded })}>
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
  const users = state.users
    .filter(({ name }) => reg.test(name))
    .map(user => {
      const uniqueName = generateUniqueChannelName(user.id, state.currentUser.id)
      const channel = state.channels.find(channel => channel.uniqueName === uniqueName)
      let unread = 0
      if (channel) unread = channel.unread
      return { ...user, unread }
    })
  const numOnline = state.users.filter(user => user.online).length
  return { users, numOnline }
}

export default connect(
  mapStateToProps,
  { activateChannel, searchUsers }
)(UserList)

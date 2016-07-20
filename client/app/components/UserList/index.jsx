import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { activateChannel, searchUsers } from 'actions'

// const UserList = ({ users, activateChannel }) =>
//   <div id="channelList">
// 		<div id="list">
// 			{users.map(({ id, name, online }) =>
//         <div
//           key={id}
//           onClick={() => activateChannel(id, name)}
//           className="user"
//         >
//           <div>{name}</div>
//           <div className={online ? 'on' : 'off'} />
// 				</div>
// 			)}
// 		</div>
// 		<b>Users Online ({users.length})</b>
// 	</div>

// UserList.propTypes = {
//   users:           PropTypes.array.isRequired,
//   activateChannel: PropTypes.func.isRequired,
// }

class UserList extends Component {
  constructor(props) {
    super(props) 
    this.state = { expanded: false },
    this.toggleExpand = this.toggleExpand.bind(this)
  }
  toggleExpand() {
    console.log("here!")
    this.setState({ expanded: !this.state.expanded })
  }
  render() {
    const { users, activateChannel, searchUsers } = this.props 
    const { expanded } = this.state 
    return (
    <div id="channelList"  >
        {
            expanded ?
                <div id="list">
                    {users.map(({ id, name, online }) =>
                    <div
                      key={id}
                      onClick={() => activateChannel(id, name)}
                      className="user"
                    >
                      <div>{name}</div>
                      <div className={online ? 'on' : 'off'} />
                    </div>
                        )}
                </div> : null
        } 
        <div>
        	<input
            type="text"
            className="messageInput"
            onChange={({ target }) => {
              searchUsers(target.value)
            }}
          />
        </div>
        <div onClick={ this.toggleExpand }>
            <b>Users Online ({users.length})</b>
        </div>
    </div>

    )
  }
}

UserList.propTypes = {
  users:           PropTypes.array.isRequired,
  activateChannel: PropTypes.func.isRequired,
  searchUsers:     PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const reg = new RegExp('^' + state.userListSearchQuery)
  const users = state.users.filter(user => reg.test(user.name))
  return { users }
}

export default connect(
  mapStateToProps,
  { activateChannel, searchUsers }
)(UserList)

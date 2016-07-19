import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { activateChannel } from 'actions'

const UserList = ({ users, activateChannel }) =>
  <div id="channelList">
		<div id="list">
			{users.map(({ id, name }) =>
				<div key={id} onClick={() => activateChannel(id, name)}>
          {name}
				</div>
			)}
		</div>
		<b>Users Online ({users.length})</b>
	</div>

UserList.propTypes = {
  users:           PropTypes.array.isRequired,
  activateChannel: PropTypes.func.isRequired,
}

export default connect(
  state => state,
  { activateChannel }
)(UserList)

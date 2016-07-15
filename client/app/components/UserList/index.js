import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { activateChannel } from '../../actions'

const UserList = ({ users, activateChannel }) =>
	<div className="channelList border">
		<ul>
			{users.map(({ id, name }) =>
				<li key={id} onClick={() => activateChannel(id, name)}>
				{name}
				</li>
			)}
		</ul>
		<h4>Users Online ({users.length})</h4>
	</div>

export
default connect(
  state => state,
  { activateChannel },
)(UserList)
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { ButtonGroup, Button, Table, Label } from 'reactstrap';
import api from '../api';

function delete_user(params){
	console.log(params.user, "user delete");
  confirm('Are you sure?') ? api.delete_user(params.user) : null;	
}

function manage_user(user, token){
  console.log(user, "user param");
  console.log(token, "token param");
  let text = JSON.stringify({
    manage: {
      manager_id: token.user_id,
      managee_id: user.id
    },
  })
  api.manage_user(text)
}

function User(params) {
	console.log(params);
  return (
  <tr>
		<td>
  		<Label>
			{params.user.email}
			</Label>
		</td>
  	<td>
  		<Label>
			{params.user.name}
			</Label>
		</td>
		<td>
  		<Label>
			{params.user.id}
			</Label>
		</td>
		<td>
			<ButtonGroup className="float-right">
				<Button onClick={delete_user.bind(null, params)} size="sm" color="danger">Delete</Button>
			</ButtonGroup>
  	</td>
  </tr>);
}

export default function Users(params) {
	console.log(params);
  let users = _.map(params.users, (uu) => <User key={uu.id} user={uu} token={params.token}/>);

  let table = 
  <Table>
  	<thead>
  		<tr>
  			<th> Email </th>
  			<th> Name </th>
  			<th> User ID </th>
  			<th> </th>
  		</tr>
  	</thead>
  	<tbody>
  		{users}
  	</tbody>
  </Table>;

  let content = params.token == null ? <Redirect to="/login" /> : table;
  return <div>
    { content }
  </div>;
}
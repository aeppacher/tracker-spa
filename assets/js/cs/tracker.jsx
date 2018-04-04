import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Users from './users';
import Nav from './nav';
import Feed from './feed';

export default function tracker_init() {
	let root = document.getElementById('root');
	ReactDOM.render(<Tracker />, root);
}

class Tracker extends React.Component {
	constructor(props) {
		super(props);


		this.state = {
			tasks: [],
			users: [],
		}

		this.request_tasks();
		this.request_users();
	}

	request_tasks() {
		$.ajax("/api/v1/tasks", {
			method: "get",
			dataType: "json",
			contentType: "application/json; charset=UTF-8",
			success: (resp) => {
				this.setState(_.extend(this.state, { tasks: resp.data }))
			}
		});
	}

	request_users() {
		$.ajax("/api/v1/users", {
			method: "get",
			dataType: "json",
			contentType: "application/json; charset=UTF-8",
			success: (resp) => {
				this.setState(_.extend(this.state, { users: resp.data }))
			}
		});
	}

	render() {
		return (
			<Router>
				<div>
					<Nav />
					<Route path="/" exact={ true } render={() =>
						<Users users={ this.state.users } />
					} />
					<Route path="/users/:user_id" render={({ match }) =>
						<Feed tasks={ _.filter(this.state.posts, (tt) => 
							match.params.user_id == tt.user.id )
						} />
					} />
				</div>
			</Router>
		);
	}
}
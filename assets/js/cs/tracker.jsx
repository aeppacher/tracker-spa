import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import Users from './users';
import Nav from './nav';
import Feed from './feed';
import Register from './register';
import TaskForm from './task-form';
import Login from './login';

export default function tracker_init(store) {
	console.log(store, "startstore");
	ReactDOM.render(
    <Provider store={store}>
      <Tracker state={store.getState()} />
    </Provider>,
    document.getElementById('root'),
  );
}

let Tracker = connect((state) => state)((props) => {
	let login = props.token == null ? <Redirect to="/login" /> : <Redirect to="/feed" />;

	return (
		<Router>
			<div>
				<Route path="/" exact={true} render={() =>
          <div>
          	{login}
          </div>
        } />
        <Route path="/users" exact={true} render={() =>
        	<div>
	          <Nav />
	          <Users users={props.users} token={props.token}/>
	        </div>
        } />
        <Route path="/users/:user_id" render={({match}) =>
        	<div>
	          <Nav />
	          <Feed tasks={_.filter(props.tasks, (pp) =>
	            match.params.user_id == pp.user.id )
	          } />
	         </div>
        } />
        <Route path="/register" exact={true} render={() =>
        	<div>
	          <Nav />
          	<Register />
          </div>
        } />
        <Route path="/login" exact={true} render={() =>
          <div>
            <Nav />
            <Login />
          </div>
        } />
        <Route path="/feed" exact={true} render={() =>
          <div>
            <Nav />
            <Feed tasks={props.tasks} token={props.token}/>
          </div>
        } />
        <Route path="/new-task" exact={true} render={() =>
          <div>
            <Nav />
            <TaskForm />
          </div>
        } />
			</div>
		</Router>
	);
});
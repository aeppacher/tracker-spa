import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import Users from './users';
import Nav from './nav';
import Feed from './feed';
import Register from './register';
import TaskForm from './task-form';

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
	return (
		<Router>
			<div>
				<Route path="/" exact={true} render={() =>
          <div>
          	<Nav />
            <TaskForm />
            <Feed tasks={props.tasks} />
          </div>
        } />
        <Route path="/users" exact={true} render={() =>
        	<div>
	          <Nav />
	          <Users users={props.tasks} />
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
			</div>
		</Router>
	);
});
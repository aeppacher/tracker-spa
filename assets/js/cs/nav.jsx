import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';

let LoginForm = connect(({login}) => {return {login};})((props) => {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }

  function create_token(ev) {
    api.submit_login(props.login);
    console.log(props.login);
  }

  return <div className="navbar-text">
    <Form inline>
      <FormGroup>
        <Input type="text" name="name" placeholder="name"
               value={props.login.name} onChange={update} />
      </FormGroup>
      <FormGroup>
        <Input type="password" name="pass" placeholder="password"
               value={props.login.pass} onChange={update} />
      </FormGroup>
      <Button onClick={create_token}>Log In</Button>
    </Form>
  </div>;
});

let Session = connect(({token}) => {return {token};})((props) => {
  return <div className="navbar-text">
  	{console.log(props.token)}
    User id = { props.token.user_id }
  </div>;
});

function Nav(props) {
  let session_info;
  let nav_options;

  if (props.token) {
    session_info = <Session token={props.token} />;
    nav_options = <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" exact={true} activeClassName="active" className="nav-link">Feed</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/users" href="#" className="nav-link">All Users</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/register" href="#" className="nav-link">Register</NavLink>
        </NavItem>
      </ul>;
  }
  else {
  	nav_options = <ul className="navbar-nav mr-auto"> </ul>;
    session_info = <LoginForm className="navbar-text"/>;
  }

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand">
      <span className="navbar-brand">
        Tracker
      </span>
      { nav_options }
      { session_info }
    </nav>
  );
}

function dispatchToProps(state) {
  return {
    token: state.token,
  };
}

export default connect(dispatchToProps)(Nav);
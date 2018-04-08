import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';

let LoginForm = connect(({login}) => {return {login};})((props) => {
  return <div className="navbar-text">
    <button type="button" className="btn btn-link" >
      <NavLink to="/login" >Log in</NavLink>
    </button>
  </div>;
});

function remove_token(ev) {
  window.document.location.href="/";
}

let Session = connect(({token}) => {return {token};})((props) => {
  return <div className="navbar-text">
  	{console.log(props.token)}
    { props.token.user_name }
    <button type="button" className="btn btn-link" onClick={remove_token}>Log out</button>
  </div>;
});

function Nav(props) {
  let session_info;
  let nav_options;

  if (props.token) {
    session_info = <Session />;
    nav_options = <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" exact={true} activeClassName="active" className="nav-link">Feed</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/users" href="#" className="nav-link">All Users</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/new-task" href="#" className="nav-link">New Task</NavLink>
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
  console.log("rerender nav");
  return {
    token: state.token,
  };
}

export default connect(dispatchToProps)(Nav);
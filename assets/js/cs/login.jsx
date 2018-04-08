import React from 'react';

import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import api from '../api';

let LoginForm = connect(({login}) => {return {login};})((props) => {
  function update(ev) {
    console.log("update login");
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
  }
  
  return (
    <div style={ {padding: "4ex"} }>
      <FormGroup>
        <Input type="text" name="email" placeholder="email"
               value={props.login.email} onChange={update} />
      </FormGroup>
      <FormGroup>
        <Input type="password" name="pass" placeholder="pass"
               value={props.login.pass} onChange={update}/>
      </FormGroup>
      <Form inline>
        <Button onClick={create_token}>Login</Button>
        <NavLink to="/register" href="#" className="nav-link">Register</NavLink>
      </Form>
    </div>
  );
});

function Login(props) {
  console.log(props);
  let alreadyLogged = 
  <div style={ {padding: "4ex", display: "inline"} }>
    <p>
      Successfully logged in!
      <NavLink to="/" exact={true} activeClassName="active" className="nav-link">to proceed to the application</NavLink>
    </p>
    <Redirect to="/users" />
  </div>;

  let login = props.token == null ? <LoginForm /> : alreadyLogged;

  return (
    <div>
      {login}
    </div>
  );
}

function state2props(state) {
  return {
    token: state.token,
  };
}

export default connect(state2props)(Login);


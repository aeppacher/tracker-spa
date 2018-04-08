import React from 'react';

import { connect } from 'react-redux';

import { Form, FormGroup, Input, Button } from 'reactstrap';
import api from '../api';


let RegisterForm = connect(({register}) => {return {register};})((props) => {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_REGISTER_FORM',
      data: data,
    });
  }

  function create_new_user(ev) {
    api.submit_user(props.register);
    window.document.location.href="/";
  }
  
  return (
    <div style={ {padding: "4ex"} }>
    <Form>
      <FormGroup>
        <Input type="text" name="name" placeholder="name"
               value={props.register.name} onChange={update} />
      </FormGroup>
      <FormGroup>
        <Input type="text" name="email" placeholder="email"
               value={props.register.email} onChange={update}/>
      </FormGroup>
      <FormGroup>
        <Input type="text" name="pass" placeholder="password"
               value={props.register.pass} onChange={update}/>
      </FormGroup>
      <Button onClick={create_new_user}>Register</Button>
    </Form>
  </div>
  );
});


function Register(params) {
  return (
    <RegisterForm />
  );
}

function state2props(state) {
  return {
    token: state.token,
  };
}

export default connect(state2props)(Register);
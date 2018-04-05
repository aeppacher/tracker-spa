import React from 'react';

import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';

import api from '../api';

function TaskForm(props) {
  function update(event) {
    let target = $(event.target);

    let data = {};
    data[target.attr('name')] = target.val();

    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    console.log(action);
    props.dispatch(action);
  }

  function submit(event){
    api.submit_task(props.form);
    console.log(props.form);
  }

  function clear(event){
    props.dispatch({
      type: 'CLEAR_FORM'
    });
  }

  let users = _.map(props.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
  return <div style={ {padding: "4ex"} }>
    <h2>New Task</h2>
    <FormGroup>
      <Label for="user_id">User</Label>
      <Input type="select" name="user_id" value={props.form.user_id} onChange={update}>
        { users }
      </Input>
    </FormGroup>
    <FormGroup>
      <Label for="body">Body</Label>
      <Input type="textarea" name="body" value={props.form.body} onChange={update}/>
    </FormGroup>
    <Button onClick={submit}>Submit</Button> &nbsp;
    <Button onClick={clear}>Clear</Button>
  </div>;
}

function dispatchToProps(state) {
  console.log("rerender", state);
  return { 
    form: state.form,
    users: state.users,
  };
}

export default connect(dispatchToProps)(TaskForm);
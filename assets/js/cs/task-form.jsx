import React from 'react';

import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom';

import api from '../api';

function TaskForm(props) {
  function update(event) {
    let target = $(event.target);

    console.log(props.users[0].id,  "keeeeey");
    let data = {};
    data[target.attr('name')] = target.val();

    if(props.form.user_id == ""){
    	data["user_id"] = props.users[0].id;
    }

    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    console.log(action);
    props.dispatch(action);
  }

  function submit(event){
    api.submit_task(props.form, props.token.token);
    console.log(props.form);
  }

  function clear(event){
    props.dispatch({
      type: 'CLEAR_FORM'
    });
  }

  let users = _.map(props.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
  let layout = <div style={ {padding: "4ex"} }>
    <h2>New Task</h2>
    <FormGroup>
      <Label for="user_id">Assign to</Label>
      <Input type="select" name="user_id" value={props.form.user_id} onChange={update}>
        { users }
      </Input>
    </FormGroup>
    <FormGroup>
      <Label for="title">Title</Label>
      <Input type="textarea" name="title" value={props.form.title} onChange={update}/>
    </FormGroup>
    <FormGroup>
      <Label for="description">Description</Label>
      <Input type="textarea" name="description" value={props.form.description} onChange={update}/>
    </FormGroup>
    <Button onClick={submit}>Submit</Button> &nbsp;
    <Button onClick={clear}>Clear</Button>
  </div>;

  let content = props.token == null ? <Redirect to="/login" /> : layout;

  return(
  	<div>
  	{content}
  	</div>
  );
}

function dispatchToProps(state) {
  console.log("rerender task-form", state);
  return { 
    form: state.form,
    users: state.users,
    token: state.token
  };
}

export default connect(dispatchToProps)(TaskForm);
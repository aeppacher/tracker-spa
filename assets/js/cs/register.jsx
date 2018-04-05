import React from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, Button } from 'reactstrap';


export default function Register(params) {
  return (
  <div>
    <Form inline>
      <FormGroup>
        <Input type="text" name="name" placeholder="name" />
      </FormGroup>
      <FormGroup>
        <Input type="password" name="pass" placeholder="password"/>
      </FormGroup>
      <Button>Registe</Button>
    </Form>
  </div>);
}
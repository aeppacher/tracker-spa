import React from 'react';

import { Link, Redirect } from 'react-router-dom';
import Task from './task';

export default function Feed(props) {
  let tasks = _.map(props.tasks, (pp) => <Task key={pp.id} task={pp} />);

  let content = props.token == null ? <Redirect to="/login" /> : tasks;
  return (
  <div>
    { content }
  </div>
  );
}
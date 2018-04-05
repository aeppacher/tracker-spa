import React from 'react';
import Task from './task';

export default function Feed(props) {
	console.log("test");
  let tasks = _.map(props.tasks, (pp) => <Task key={pp.id} task={pp} />);
  return (
  <div>
    { tasks }
  </div>
  );
}

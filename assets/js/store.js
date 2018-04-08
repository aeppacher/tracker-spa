import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

/*
 *  state layout:
 *  {
 *   tasks: [... Tasks ...],
 *   users: [... Users ...],
 *   form: {
 *     user_id: null,
 *     body: "",
 *   }
 * }
 *
 * */


function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      console.log(action.token, "fucking token");
      return action.token;
    default:
      return state;
  }
}

let empty_login = {
  email: "",
  pass: "",
  token: "",
};

let empty_register = {
  name: "",
  email: "",
  pass: "",
};

function login(state = empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function register(state = empty_register, action) {
  switch (action.type) {
    case 'UPDATE_REGISTER_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function tasks(state = [], action) {
  switch (action.type) {
  case 'TASKS_LIST':
    return [...action.tasks];
  case 'ADD_TASK':
    return [action.task, ...state];
  default:
    return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
  case 'USERS_LIST':
    return [...action.users];
  case 'ADD_USER':
    return [action.user, ...state];
  case 'DELETE_USER':
    var users = state;
    var newState = users.filter(function(x) {
      return x.id !== action.user.id;
    });
    return newState
  default:
    return state;
  }
}

let empty_form = {
  user_id: "",
  title: "",
  description: "",
};

function form(state = empty_form, action) {
  switch (action.type) {
    case 'UPDATE_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_FORM':
      return empty_form;
    default:
      return state;
  }
}

function root_reducer(state0, action) {
  console.log("reducer", action);
  // {tasks, users, form} is ES6 shorthand for
  // {tasks: tasks, users: users, form: form}
  let reducer = combineReducers({tasks, users, form, token, login, register});
  let state1 = reducer(state0, action);
  console.log("state1", state1);
  return deepFreeze(state1);
};

let store = createStore(root_reducer);

export default store;
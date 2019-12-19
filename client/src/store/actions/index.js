import { DELETE_EXEC, SET_TASK, CHANGE_ACTIVE_ITEM, LOG_IN, FETCH_USER_TABLE, FETCH_TASK_TABLE, FETCH_STATE_TABLE, ADD_USER, DELETE_USER, ADD_TASK, SET_TASK_STATE, CHECK, LOGOUT } from './types';
import axios from 'axios';

export const changeActiveItem = obj => dispatch => {
  dispatch({ type: CHANGE_ACTIVE_ITEM, payload: obj });
};

export const logIn = obj => dispatch => {
  axios
    .post('/auth/login', obj)
    .then(res => {
      localStorage.setItem('token', res.data.token);
      dispatch({
        type: LOG_IN,
        payload: res.data.success
      })
    })
};

export const signUp = obj => dispatch => {
  axios
    .post('/auth/register', obj)
    .then(res => {
      localStorage.setItem('token', res.data.token);
      console.log(res.data);
      dispatch({
        type: CHECK,
        payload: res.data.success
      })
    })
};

export const logOut = () => dispatch => {
  localStorage.removeItem('token');
  dispatch({
    type: LOGOUT,
    logged: false
  })
}

export const check = obj => dispatch => {
  const token = localStorage.getItem('token');
  if (token) {
    axios
      .post('/auth/auth-check', { token })
      .then(res => {
        dispatch({
          type: CHECK,
          payload: res.data.success
        })
      })
  } else dispatch({
    type: CHECK,
    payload: false
  })
};

export const fetchUserTable = () => dispatch => {
  axios
    .get('/users/')
    .then(res => dispatch({
      type: FETCH_USER_TABLE,
      payload: res.data
    }))
};

export const fetchTaskTable = () => dispatch => {
  axios
    .get(`/tasks/`)
    .then(res => dispatch({
      type: FETCH_TASK_TABLE,
      payload: res.data
    }))
};

export const fetchStateTable = () => dispatch => {
  axios
    .get('/tasks/state/')
    .then(res => dispatch({
      type: FETCH_STATE_TABLE,
      payload: res.data
    }))
};

export const addUser = obj => dispatch => {
  axios
    .post('/users/add', obj)
    .then(res => dispatch({
      type: ADD_USER,
      payload: res.data
    }))
};

export const deleteUser = userid => dispatch => {
  axios
    .delete(`/users/delete/${userid}`)
    .then(res => dispatch({
      type: DELETE_USER,
      payload: res.data
    }))
};

export const deleteExec = obj => dispatch => {
  console.log(obj);
  axios
    .delete(`/tasks/delete-user/${obj.username}/${obj.taskname}`)
    .then(res => dispatch({
      type: DELETE_EXEC,
      payload: res.data
    }))
};

export const setTask = obj => dispatch => {
  axios
    .post('/tasks/add-user/', obj)
    .then(res => dispatch({
      type: SET_TASK,
      payload: res
    }))
};

export const setTaskState = obj => dispatch => {
  axios
    .post('/tasks/state/', obj)
    .then(res => dispatch({
      type: SET_TASK_STATE,
      payload: res
    }))
};

export const addTask = obj => dispatch => {
  axios
    .post('/tasks/add/', obj)
    .then(res => dispatch({
      type: ADD_TASK,
      payload: res
    }))
};
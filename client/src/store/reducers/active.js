import { DELETE_EXEC, CHANGE_ACTIVE_ITEM, LOG_IN, FETCH_USER_TABLE, FETCH_STATE_TABLE, FETCH_TASK_TABLE, DELETE_USER, ADD_USER, CHECK, LOGOUT } from '../actions/types';

const initialState = {
    activeItem: '',
    logged: false,
    userTable: [],
    stateTable: [],
    taskTable: [],
    msg: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CHANGE_ACTIVE_ITEM:
            return {
                ...state,
                activeItem: action.payload
            };
        case LOG_IN:
            return {
                ...state,
                logged: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                logged: action.payload
            };
        case CHECK:
            return {
                ...state,
                logged: action.payload
            };
        case ADD_USER:
            return {
                ...state,
                users: action.payload
            };
        case FETCH_STATE_TABLE:
            return {
                ...state,
                stateTable: action.payload
            }
        case FETCH_USER_TABLE:
            return {
                ...state,
                userTable: action.payload
            };
        case FETCH_TASK_TABLE:
            return {
                ...state,
                taskTable: action.payload
            };
        case DELETE_USER:
            return {
                ...state,
                msg: action.payload
            };
        case DELETE_EXEC:
            return {
                ...state,
                msg: action.payload
            };
        default:
            return state;
    }
}
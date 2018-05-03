import { combineReducers } from 'redux'
import Tool from 'tool'

function sign(state = { states: { isLegal: true, msgCode: { status: 200, msg: "OK", data: null } }, values: {} }, action) {
    switch (action.type) {
        case 'SIGN':
            //console.log(action.values);
            let values = Object.assign({}, state.values, action.values);
            return {
                ...state,
                values
            };
        case 'STATE':
            let states = Object.assign({}, state.states, action.states);
            /*console.log(action, {
                ...state,
                states
            });*/
            return {
                ...state,
                states
            };
        default:
            return state;
    }
}

function redeem(state = { states: {}, values: {} }, action) {
    switch (action.type) {
        case 'REDEEM':
            //console.log(action.values);
            let values = Object.assign({}, state.values, action.values);
            return {
                ...state,
                values
            };
        case 'STATE':
            let states = Object.assign({}, state.states, action.states);
            /*console.log(action, {
                ...state,
                states
            });*/
            return {
                ...state,
                states
            };
        default:
            return state;
    }
}

function revoke(state = { states: {}, values: {} }, action) {
    switch (action.type) {
        case 'REVOKE':
            //console.log(action.values);
            let values = Object.assign({}, state.values, action.values);
            return {
                ...state,
                values
            };
        case 'STATE':
            let states = Object.assign({}, state.states, action.states);
            /*console.log(action, {
                ...state,
                states
            });*/
            return {
                ...state,
                states
            };
        default:
            return state;
    }
}

function surrender(state = { states: {}, values: {} }, action) {
    switch (action.type) {
        case 'SURRENDER':
            //console.log(action.values);
            let values = Object.assign({}, state.values, action.values);
            return {
                ...state,
                values
            };
        case 'STATE':
            let states = Object.assign({}, state.states, action.states);
            /*console.log(action, {
                ...state,
                states
            });*/
            return {
                ...state,
                states
            };
        default:
            return state;
    }
}

function myFinancing(state = { states: {}, values: {} }, action) {
    switch (action.type) {
        case 'MYFINANCING':
            //console.log(action.values);
            let values = Object.assign({}, state.values, action.values);
            return {
                ...state,
                values
            };
        case 'STATE':
            let states = Object.assign({}, state.states, action.states);
            /*console.log(action, {
                ...state,
                states
            });*/
            return {
                ...state,
                states
            };
        default:
            return state;
    }
}

function index(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'INCREMENT_IF_ODD':
            return (state % 2 !== 0) ? state + 1 : state
        case 'DECREMENT':
            return state - 1
        default:
            return state
    }
}


const rootReducer = combineReducers({
    sign,
    redeem,
    revoke,
    surrender,
    myFinancing,
    index
});

export default rootReducer

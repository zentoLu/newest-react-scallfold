import { combineReducers } from 'redux'
import Tool from 'tool'
function sign(state = {states: {isLegal: true, msgCode: {status: 200, msg: "OK", data: null}},values: {}}, action) {
    switch(action.type) {
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

const rootReducer = combineReducers({
    sign
});

export default rootReducer

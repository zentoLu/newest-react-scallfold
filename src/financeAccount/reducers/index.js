import { combineReducers } from 'redux'
import Tool from 'tool'
function account(state = {states: {isLegal: true},values: {actorName: "陆同春", mobile: "13480704730", smsCode: "1345", actorIdCode: "421022199005015497"}}, action) {
    switch(action.type) {
        case 'ACCOUNT':
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
    account
});

export default rootReducer

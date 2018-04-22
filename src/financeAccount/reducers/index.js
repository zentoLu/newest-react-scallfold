import { combineReducers } from 'redux'
import Tool from 'tool'
function account(state = {states: {isLegal: false, msgCode: {status: 200, msg: "OK", data: null}},values: {"isMixedCtf":1,"clientName":"发送打","idCode":"421002","bankAcc":"454654","bankAccName":"46465","officePhone":"0755-56569898","address":"大收费的","reprName":"陆同春","reprMobile":"13480704730","reprIdCode":"421022199005015497", actorName: "陆同春", mobile: "13480704730", smsCode: "1345", actorIdCode: "421022199005015497"}}, action) {
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

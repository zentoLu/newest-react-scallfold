import { combineReducers } from 'redux'
import Tool from 'tool'

let accountInit = { states: { isLegal: false, msgCode: { status: 200, msg: "OK", data: { 'smsFlowNo': '123456789' } } }, values: { "isMixedCtf": 1, "actorName": "范木贵", "mobile": "13480704756", "actorIdCode": "452524198112084035", "clientName": "南宁市农家香农副产品有限公司", "idCode": "914301005722323769", "bankAcc": "6236683370002851926", "bankNo": "06", "bankCity": ["5810", "5810"], "officePhone": "0755-56569898", "addressPrefix": ["340000", "340300", "340323"], "address": "大收费的", "reprName": "范木贵", "reprMobile": "13480704756", "reprIdCode": "452524198112084035" } };

/*var cache = Tool.cookie.get('store');
var initialState = cache ? JSON.parse(cache) : {};
console.log(cache);*/

function account(state = accountInit, action) {
    let values;
    switch (action.type) {
        case 'ACCOUNT':
            //console.log(action.values);
            values = Object.assign({}, state.values, action.values);
            return {
                ...state,
                values
            };
        case 'FORM':
            console.log(action.values);
            values = Object.assign({}, state.values, action.values);
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

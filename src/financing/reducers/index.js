import { combineReducers } from 'redux'
function sign(state = {}, action) {
    switch(action.type) {
        case 'SIGN':
            console.log(action.values);
            var values = action.values;
            return {
                ...state,
                values
            };
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    sign
});

export default rootReducer

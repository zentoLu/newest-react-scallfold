import { createStore } from 'redux';

function configureStore(initialState, rootReducer) {
    const store = createStore(
        rootReducer,
        initialState
    )


    return store
}

export default configureStore

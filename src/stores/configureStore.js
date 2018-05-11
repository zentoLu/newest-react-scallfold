import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import Tool from 'tool'

function configureStore(initialState, rootReducer, sagas) {
    //console.log(sagas);

    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(sagaMiddleware)
    )

    sagaMiddleware.run(sagas);

    return store
}

export default configureStore

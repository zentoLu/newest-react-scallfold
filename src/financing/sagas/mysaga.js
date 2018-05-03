import { put, takeEvery } from 'redux-saga/effects'

// 一个工具函数：返回一个 Promise，这个 Promise 将在 1 秒后 resolve
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export function* incrementAsync() {
    //debugger;
    yield delay(1000)
    yield put({ type: 'INCREMENT' })
}

export default function* rootSaga() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

import { put, takeEvery, take, call, fork, select, takeLatest } from 'redux-saga/effects'

const delay = (ms) => new Promise(res => setTimeout(res, ms))


export function* helloSaga(){

    const name = yield select(state => state.name)

    console.log("hello saga!", name)
}

// export function* helloSaga1(){
//     console.log("hello saga from 2nd!")
// }

export function* sagaSum(){
    const sum = 25+25;

    yield delay(3000)

    console.log("sum: " ,  sum)
    return
}

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
    yield delay(1000)

    // yield call(sagaSum)
    yield fork(sagaSum)

    yield put({ type: 'INCREMENT' })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)

    // yield take('INCREMENT_ASYNC')

    // console.log("this is statement to trigger")

    // yield call(sagaSum)
    
}
  

// WORKER SAGA : Will perform async decrement task 
export function* decrementAsync() {
    yield delay(2000)
    yield put({ type: 'DECREMENT'})
}

//  watcher saga 
export function* watchDecrementAsync() {
    yield takeEvery( 'DECREMENT_ASYNC', decrementAsync )
}

// fetch post data from api end points
async function fetchUserData() {
    const data = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    const res = await data.json()
    return res
}


// worker saga
export function* fetchPostsDataAsync() {
    try {
        // making the api request and getting response
        yield put({type: 'FETCH_POST_REQUEST'})
        const response = yield call(fetchUserData);
        //dispatching the successs action with response data
        yield put({type: 'FETCH_POST_SUCCESS', payload: response});
    } catch (error) {
        yield put({type: 'FETCH_POST_FAILURE', payload: error.message});
    }
}

// watcher saga
export function* watchGetPostsDataAsync() {
    yield takeLatest("GET_ALL_POSTS", fetchPostsDataAsync)
}


// practice-- fetch post data from api end points
async function fetchDta(){
    const dta = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=2')
    const resp = await dta.json();
    return resp 
}

// worker saga for my practice
export function* fetchPhotosDataAsync(){
    try {
        // making api request and getting response
        yield put({type: 'FETCH_PHOTOS_REQUEST'})
        const response = yield call(fetchDta);
        // dispatching the success action with response data
        yield put({type: 'FETCH_PHOTOS_SUCCESS', payload: response})
    } catch (error) {
        yield put({type: 'FETCH_PHOTOS_FAILURE', payload: error.message})
    }
}
// watcher saga for my practice
export function* watchGetPhotosDataAsync() {
    yield takeLatest("GET_ALL_PHOTOS", fetchPhotosDataAsync)
}
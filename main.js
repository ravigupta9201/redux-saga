import "@babel/polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension';

import createSagaMiddleware from 'redux-saga'

// import { helloSaga } from "./saga"
import { helloSaga, watchIncrementAsync, watchDecrementAsync,  watchGetPostsDataAsync, watchGetPhotosDataAsync } from "./saga"

const sagaMiddleware = createSagaMiddleware()

import Counter from './Counter'
import reducer from './reducers'

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(helloSaga)
// sagaMiddleware.run(helloSaga1)

sagaMiddleware.run(watchIncrementAsync)
sagaMiddleware.run(watchDecrementAsync)
sagaMiddleware.run( watchGetPostsDataAsync)
sagaMiddleware.run( watchGetPhotosDataAsync )

const dispatch = type => store.dispatch({type})

function render() {

  const storeData = store.getState()

  ReactDOM.render(
    <Counter
      value={storeData.count}
      postData={storeData.postData}
      photoData={storeData.photoData}
      onIncrement={() => dispatch('INCREMENT')}
      onDecrement={() => dispatch('DECREMENT')}
      onIncrementAsync={() => dispatch('INCREMENT_ASYNC')}  
      onDecrementAsync={() => dispatch('DECREMENT_ASYNC')}  
      getAllPost={() => dispatch('GET_ALL_POSTS')}  
      getAllPhotos={() => dispatch('GET_ALL_PHOTOS')}  
    />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)

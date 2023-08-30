import React from 'react'
import { PropTypes } from 'prop-types';

const Counter = ({ value, onIncrement, onDecrement, onIncrementAsync, onDecrementAsync , getAllPost, getAllPhotos , postData, photoData }) =>
      <div>
        <button onClick={onIncrementAsync}>
          Increment after 3 second
        </button>
        {' '}
        <button onClick={onDecrementAsync}>
          Decrement after 2 second
        </button>
        {' '}
        <button onClick={onIncrement}>
          Increment
        </button>
        {' '}
        <button onClick={onDecrement}>
          Decrement
        </button>
        {' '}
        <button onClick={getAllPost}>
          Get All Post
        </button>
        {' '}
        <button onClick={getAllPhotos}>
          Get All Photos
        </button>
        <hr />
        <div>
          Clicked: {value} times
        </div>
        <h3>All posts</h3>
        {
          postData?.length > 0 && postData.map((el, index)=> (
            <div key={index}>{el.body} </div>
          ))
        }
        <h3>All photos</h3>
        {
          photoData.map((el,index)=>(
            // <div key={index}>{el.title}</div>
            <img key={el.id} src={el.url} alt={el.title} />
          ))
        }
      </div>

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired
}

export default Counter

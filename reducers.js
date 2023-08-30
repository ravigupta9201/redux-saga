const initialState = {count: 0, name: "Vikash", isloading: false, postData: [], error: "", photoData: [] };

export default function counter( state = initialState , action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count:state.count+1 }
    case 'INCREMENT_IF_ODD':
      return { ...state, count:state.count+1 }
    case 'DECREMENT':
      return { ...state, count:state.count-1 }
    case 'FETCH_POST_REQUEST':
      return { ...state, isLoading: true }
    case 'FETCH_POST_SUCCESS':
      return { ...state, isloading: false, postData: action.payload }
    case 'FETCH_POST_FAILURE':
      return {...state, isloading: false, error: action.payload }  
    

    case 'FETCH_PHOTOS_REQUEST':
      return {...state, isloading: true }
    case 'FETCH_PHOTOS_SUCCESS':
      return { ...state, isloading: false, photoData: action.payload}
    case 'FETCH_PHOTOS_FAILURE':
      return {...state, isloading: false, error: action.payload}
    default:
      return state
  }
}


import moment from 'moment';

//Action Constants
const requestPostsType = 'REQUEST_POSTS';
const receivePostsType = 'RECEIVE_POSTS';
const filterCurrentPostsType = 'FILTER_CURRENT_POSTS';
const filterAllPostsByLocationType = 'FILTER_ALL_POSTS_BY_LOCATION';
const filterAllPostsByDateType = 'FILTER_ALL_POSTS_BY_DATE';
const filterCurrentPostsByDateType = 'FILTER_CURRENT_POSTS_BY_DATE';
const filterCurrentPostsByLocationType = 'FILTER_CURRENT_POSTS_BY_LOCATION';
const updatePostListType = `UPDATE_POST_LIST`;
const setPostToEditType = 'SET_POST_TO_EDIT';

const initialState = { posts: [], isLoading: false};
//Action Creators
export const postActionCreators = {
  requestPosts: id => async (dispatch, getState) => {
    dispatch({ type: requestPostsType });

    const url = `api/Posts`;
    const response = await fetch(url);
    const posts = await response.json();

    dispatch({ type: receivePostsType, posts });
    // dispatch({ type: filterCurrentPostsType });
  },
  filterAllPostsByLocation: location => (dispatch, getState) => {
    dispatch({ type: filterAllPostsByLocationType, location });
  },
  filterAllPostsByDate: value => (dispatch, getState) => {
    dispatch({ type: filterAllPostsByDateType, value });
  },
  filterCurrentPostsByLocation: location => (dispatch, getState) => {
    dispatch({ type: filterCurrentPostsByLocationType, location });
  },
  filterCurrentPostsByDate: value => (dispatch, getState) => {
    dispatch({ type: filterCurrentPostsByDateType, value });
  },
  setPostToEdit: id => (dispatch, getState) => {
    dispatch({ type: setPostToEditType, id });
  },
  createNewPost: (title, description, locationId, pointValue, dateOpened, dateClosed) => (dispatch, getState) => {
    const url = `api/Posts`
    const data = {
      title: title,
      description: description,
      pointValue: pointValue,
      dateOpened: dateOpened,
      dateClosed: dateClosed,
      locationId: locationId
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
      'Content-Type': 'application/json'
    }
    }).then(res => res.json())
    .then(response => console.log('Success', JSON.stringify(response)))
    .catch(error => console.error('Error', error))
    .then(() => fetch(url))
    .then(res => res.json())
    .then(updatedPosts => dispatch({ type: updatePostListType, updatedPosts }))
  },
  editPost: (title, description, pointValue, dateClosed, locationId, id) => (dispatch, getState) => {
    const url = `api/Posts/${id}`
    const data = {
      title: title,
      description: description,
      pointValue: pointValue,
      dateClosed: dateClosed,
      locationId: locationId,
      id: id
    }
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers:{
      'Content-Type': 'application/json'
    }
    })
    .then(response => console.log('Success', JSON.stringify(response)))
    .catch(error => console.error('Error', error))
    .then(() => fetch(`api/Posts`))
    .then(res => res.json())
    .then(updatedPosts => dispatch({ type: updatePostListType, updatedPosts }))
  },
  deletePost: (id) => (dispatch, getState) => {
    const url = `api/Posts/${id}`
    fetch(url, {
      method: 'DELETE'
    })
    .then(response => console.log('Success'))
    .catch(error => console.error('Error', error))
    .then(() => fetch(`api/Posts`))
    .then(res => res.json())
    .then(updatedPosts => dispatch({ type: updatePostListType, updatedPosts }))
  }
};
//Reducers
export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestPostsType) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === receivePostsType) {
    const postsWithMoment = action.posts.map(post => Object.assign(post, {dateOpened: moment(post.dateOpened), dateClosed: moment(post.dateClosed)}));
    const currentPostsWithMoment = postsWithMoment.filter(post => post.dateClosed.isAfter());
    return {
      ...state,
      posts: postsWithMoment,
      currentPosts: currentPostsWithMoment,
      isLoading: false
    };
  }

  if (action.type === filterCurrentPostsType) {
    const allPosts = state.posts.slice();
    const currentPosts = allPosts.filter(post => post.dateClosed.isBefore(moment()));
    console.log(currentPosts)
    return {
      ...state,
      currentPosts: currentPosts
    }
  }

  if (action.type === filterAllPostsByLocationType) {
    if(action.location === "All") {
      return {
        ...state,
        filteredPosts: state.posts.slice()
      }
    } else {
      const shownPosts = state.posts.slice();
      const filteredPosts = shownPosts.filter(post => post.location === action.location);
      return {
        ...state,
        filteredPosts: filteredPosts
      }
    }
  }

  if (action.type === filterAllPostsByDateType) {
    const shownPosts = state.posts.slice();
    const sortedPosts = shownPosts.sort(function(a,b){
      if(action.value === "1"){
        return Date.parse(b.dateClosed) - Date.parse(a.dateClosed);
      } else {
        return Date.parse(a.dateClosed) - Date.parse(b.dateClosed);
      }
    });
    return {
      ...state,
      filteredPosts: sortedPosts
    }
  }

  if (action.type === filterCurrentPostsByLocationType) {
    if(action.location === "All") {
      return {
        ...state,
        filteredPosts: state.currentPosts.slice()
      }
    } else {
      const shownPosts = state.currentPosts.slice();
      const filteredPosts = shownPosts.filter(post => post.location === action.location);
      return {
        ...state,
        filteredPosts: filteredPosts
      }
    }
  }

  if (action.type === filterCurrentPostsByDateType) {
    const shownPosts = state.currentPosts.slice();
    const sortedPosts = shownPosts.sort(function(a,b){
      if(action.value === "1"){
        return Date.parse(b.dateClosed) - Date.parse(a.dateClosed);
      } else {
        return Date.parse(a.dateClosed) - Date.parse(b.dateClosed);
      }
      return {
        ...state,
        filteredPosts: sortedPosts
      }
    });
  }

  if (action.type === setPostToEditType) {
    const allPosts = state.posts.slice();
    const postToEdit = allPosts.find(post => post.id == action.id);
    console.log(postToEdit);
    return {
      ...state,
      postToEdit: postToEdit
    }
  }

  if (action.type === updatePostListType) {
    const postsWithMoment = action.updatedPosts.map(post => Object.assign(post, {dateOpened: moment(post.dateOpened), dateClosed: moment(post.dateClosed)}))
    return {
      ...state,
      posts: postsWithMoment
    }
  }

  return state;
};

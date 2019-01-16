import moment from 'moment';
import { apiurl } from '../api';

//Action Constants
const requestPostsType = 'REQUEST_POSTS';
const receivePostsType = 'RECEIVE_POSTS';
const updatePostListType = `UPDATE_POST_LIST`;
const setPostToEditType = 'SET_POST_TO_EDIT';

const initialState = { posts: [], isLoading: false};
//Action Creators
export const postActionCreators = {
  requestPosts: id => async (dispatch, getState) => {
    dispatch({ type: requestPostsType });

    const url = `${apiurl}/Posts`;
    const response = await fetch(url);
    const posts = await response.json();

    dispatch({ type: receivePostsType, posts });
  },
  setPostToEdit: id => (dispatch, getState) => {
    dispatch({ type: setPostToEditType, id });
  },
  createNewPost: (title, description, locationId, pointValue, dateOpened, dateClosed) => (dispatch, getState) => {
    const url = `${apiurl}/Posts`
    console.log(locationId)
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
    const url = `${apiurl}/Posts/${id}`
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
    .then(() => fetch(`${apiurl}/Posts`))
    .then(res => res.json())
    .then(updatedPosts => dispatch({ type: updatePostListType, updatedPosts }))
  },
  deletePost: (id) => (dispatch, getState) => {
    const url = `${apiurl}/Posts/${id}`
    fetch(url, {
      method: 'DELETE'
    })
    .then(response => console.log('Success'))
    .catch(error => console.error('Error', error))
    .then(() => fetch(`${apiurl}/Posts`))
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
    const postsWithMoment = action.posts.map(post => Object.assign(post, {dateOpened: moment(post.dateOpened, "ddd MMM DD YYYY LTS"), dateClosed: moment(post.dateClosed, "ddd MMM DD YYYY LTS")}));
    const currentPostsWithMoment = postsWithMoment.filter(post => post.dateClosed.isAfter());
    return {
      ...state,
      posts: postsWithMoment,
      currentPosts: currentPostsWithMoment,
      isLoading: false
    };
  }

  if (action.type === setPostToEditType) {
    const allPosts = state.posts.slice();
    const postToEdit = allPosts.find(post => post.id == action.id);
    return {
      ...state,
      postToEdit: postToEdit
    }
  }

  if (action.type === updatePostListType) {
    const postsWithMoment = action.updatedPosts.map(post => Object.assign(post, {dateOpened: moment(post.dateOpened, "ddd MMM DD YYYY LTS"), dateClosed: moment(post.dateClosed, "ddd MMM DD YYYY LTS")}))
    return {
      ...state,
      posts: postsWithMoment
    }
  }

  return state;
};

const requestPostsType = 'REQUEST_POSTS';
const receivePostsType = 'RECEIVE_POSTS';
const initialState = { posts: [], isLoading: false};

export const actionCreators = {
  requestPosts: id => async (dispatch, getState) => {
    dispatch({ type: requestPostsType});

    const url = `api/Post/Posts`;
    const response = await fetch(url);
    const posts = await response.json();

    dispatch({ type: receivePostsType, posts});
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestPostsType) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === receivePostsType) {
    return {
      ...state,
      posts: action.posts,
      isLoading: false
    };
  }

  return state;
};

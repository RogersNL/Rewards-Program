const requestPostsType = 'REQUEST_POSTS';
const receivePostsType = 'RECEIVE_POSTS';
const filterCurrentPostsType = 'FILTER_CURRENT_POSTS';
const filterPostsByLocationType = 'FILTER_POSTS_BY_LOCATION';
const initialState = { posts: [], isLoading: false};

export const postActionCreators = {
  requestPosts: id => async (dispatch, getState) => {
    dispatch({ type: requestPostsType});

    const url = `api/Post/Posts`;
    const response = await fetch(url);
    const posts = await response.json();

    dispatch({ type: receivePostsType, posts});
    dispatch({ type: filterCurrentPostsType });
  },
  filterPostsByLocation: location => async (dispatch, getState) => {
    dispatch({ type: filterPostsByLocationType, location });
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

  if (action.type === filterCurrentPostsType) {
    const allPosts = state.posts.slice();
    const currentPosts = allPosts.filter(post => Date.parse(post.dateClosed) > Date.now());
    return {
      ...state,
      currentPosts: currentPosts
    }
  }

  if (action.type === filterPostsByLocationType) {
    const shownPosts = state.currentPosts.slice();
    const filteredPosts = shownPosts.filter(post => post.location === action.location);
    return {
      ...state,
      filteredPosts: filteredPosts
    }
  }
  return state;
};

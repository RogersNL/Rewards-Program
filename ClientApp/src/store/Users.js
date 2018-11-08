const requestUsersType = 'REQUEST_USERS';
const receiveUsersType = 'RECEIVE_USERS';
const sortUsersByPointsType = 'SORT_USERS_BY_POINTS';
const initialState = { users: [], isLoading: false};

export const userActionCreators = {
  requestUsers: id => async (dispatch, getState) => {
    dispatch({ type: requestUsersType });

    const url = `api/User/Users`;
    const response = await fetch(url);
    const users = await response.json();

    dispatch({ type: receiveUsersType, users });
    dispatch({ type: sortUsersByPointsType });
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestUsersType) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === receiveUsersType) {
    return {
      ...state,
      users: action.users,
      isLoading: false
    };
  }

  if (action.type === sortUsersByPointsType) {
    const userList = state.users.slice();
    const sortedUsers = userList.sort(function(a,b){
      return b.lifetimePoints - a.lifetimePoints;
    })
    return {
      ...state,
      sortedUsers: sortedUsers
    }
  }

  return state;
};

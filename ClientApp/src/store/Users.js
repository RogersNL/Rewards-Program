import { adalApiFetch } from '../adalConfig';

const requestUsersType = 'REQUEST_USERS';
const receiveUsersType = 'RECEIVE_USERS';
const sortUsersByPointsType = 'SORT_USERS_BY_POINTS';
const setLoggedInUserType = 'SET_LOGGED_IN_USER';
const requestAdminTableType = 'REQUEST_ADMIN_TABLE';
const receiveAdminTableType = 'RECEIVE_ADMIN_TABLE';
const registerUserType = 'REGISTER_USER';
const initialState = { users: [], isLoading: false};

export const userActionCreators = {
  requestUsers: id => async (dispatch, getState) => {
    dispatch({ type: requestUsersType });

    const url = `api/Employees`;
    const response = await fetch(url);
    const users = await response.json();

    dispatch({ type: receiveUsersType, users });
    // dispatch({ type: sortUsersByPointsType });
  },
  setLoggedInUser: id => (dispatch, getState) => {
    Promise.all([adalApiFetch(fetch, 'https://graph.microsoft.com/v1.0/me', {}), fetch(`api/Employees`)])
      .then(([user, employees]) => Promise.all([user.json(), employees.json()]))
      .then(([user, employees]) => {
        console.log(user, employees);
        const currentUser = employees.find(employee => employee.graphId === user.id);
        if(currentUser){
          dispatch({ type: setLoggedInUserType, currentUser })
        } else {
          console.log(currentUser);
          const newUser = {
            name: user.displayName,
            email: user.mail,
            graphId: user.id,
            currentPoints: 0,
            lifetimePoints: 0,
            adminLevel: 1,
            locationId: 0
          };
          fetch(`api/Employees`, {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(response => console.log('Success', JSON.stringify(response)))
          .then(() => window.location.reload())
          .catch(error => console.error('Error', error))
        }
      })
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

  if (action.type === requestAdminTableType) {
    return {
      ...state,
      isLoading: true
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

  if (action.type === setLoggedInUserType) {
    return {
      ...state,
      loggedInUser: action.currentUser
    }
  }

  if (action.type === registerUserType) {
    const newUser = {
      name: action.user.displayName,
      email: action.user.mail,
      graphId: action.user.id,
      currentPoints: 0,
      lifetimePoints: 0,
      adminLevel: 1,
      locationId: 0
    };
    return {
      ...state,
      newUser: newUser
    }
  }

  return state;
};

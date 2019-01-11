import { userActionCreators, reducer } from './../../src/store/Users';


describe('userReducer', () => {
  const initialState = { users: [], isLoading: false};
  const sampleUser1 = {
    employeeId: 0,
    name: "Nick Rogers",
    email: "testEmail1@example.com",
    currentPoints: 100,
    lifetimePoints: 200,
    graphId: "graphIdString1",
    adminLevel: 1,
    locationId: 0
  }
  const sampleUser2 = {
    employeeId: 1,
    name: "John Murray",
    email: "testEmail2@example.com",
    currentPoints: 500,
    lifetimePoints: 1200,
    graphId: "graphIdString2",
    adminLevel: 1,
    locationId: 0
  }
  const sampleUser3 = {
    employeeId: 2,
    name: "Sarah Jones",
    email: "testEmail3@example.com",
    currentPoints: 0,
    lifetimePoints: 50,
    graphId: "graphIdString3",
    adminLevel: 0,
    locationId: 0
  }

  it('Should return default state if no action type is recognized', () => {
    expect(reducer(initialState, { type: null })).toEqual(initialState)
  });

  it('Should return the state with isLoading set to true', () => {
    const expectedState = Object.assign(initialState, { isLoading: true });
    expect(reducer(initialState, { type: 'REQUEST_USERS' })).toEqual(expectedState)
  })

  it('Should return the new users array with isLoading set to false', () => {
    const users = [sampleUser1, sampleUser2, sampleUser3];
    const expectedState = Object.assign(initialState, { users: users, isLoading: false });
    expect(reducer(initialState, {type: 'RECEIVE_USERS', users})).toEqual(expectedState)
  })

  it('Should sort the new users array by lifetimePoints and set a new slice of state', () => {
    const users = [sampleUser1, sampleUser2, sampleUser3];
    const sortedUsers = [sampleUser2, sampleUser1, sampleUser3];
    const stateWithUsers = Object.assign(initialState, { users: users });
    const expectedState = Object.assign(initialState, { users: users, sortedUsers: sortedUsers });
    expect(reducer(stateWithUsers, {type: 'SORT_USERS_BY_POINTS'})).toEqual(expectedState)
  })

  it('Should set logged in user to the user given', () => {
    const currentUser = sampleUser1;
    const expectedState = Object.assign(initialState, { loggedInUser: currentUser })
    expect(reducer(initialState, {type: 'SET_LOGGED_IN_USER', currentUser})).toEqual(expectedState)
  })

  it('Should register a user to the users list', () => {
    const user = {
      displayName: 'Bob Miller',
      mail: 'testEmail5@example.com',
      id: 'graphIdString5'
    }
    const sampleUser5 = {
      name: 'Bob Miller',
      email: 'testEmail5@example.com',
      currentPoints: 0,
      lifetimePoints: 0,
      graphId: 'graphIdString5',
      adminLevel: 1,
      locationId: 0
    }
    const users = [sampleUser1, sampleUser2, sampleUser3]
    const stateWithUsers = Object.assign(initialState, { users: users });
    const expectedState = Object.assign(stateWithUsers, { newUser: sampleUser5})
    expect(reducer(stateWithUsers, { type: 'REGISTER_USER', user})).toEqual(expectedState)
  })

  it('Should update user list', () => {
    const sampleUser4 = {
      employeeId: 3,
      name: "James Hanley",
      email: "testEmail4@example.com",
      currentPoints: 400,
      lifetimePoints: 2000,
      graphId: "graphIdString4",
      adminLevel: 0,
      locationId: 0
    }
    const users = [sampleUser1, sampleUser2, sampleUser3]
    const newUserList = [sampleUser1, sampleUser2, sampleUser3, sampleUser4]
    const previousState = Object.assign(initialState, { users: users })
    const expectedState = Object.assign(previousState, { users: newUserList })
    expect(reducer(previousState, {type:'UPDATE_USER_LIST', newUserList})).toEqual(expectedState)
  })
});

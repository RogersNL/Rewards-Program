import { apiurl } from '../api';

const requestLocationsType = 'REQUEST_LOCATIONS';
const receiveLocationsType = 'RECEIVE_LOCATIONS';
const updateLocationsListType = 'UPDATE_LOCATIONS_LIST';

const initialState = { locations: [], isLoading: false};

export const locationActionCreators = {
  requestLocations: id => async (dispatch, getState) => {
    dispatch({ type: requestLocationsType});

    const url = `${apiurl}/Locations`;
    const response = await fetch(url);
    const locations = await response.json();

    dispatch({ type: receiveLocationsType, locations});
  },
  createLocation: (name, address) => (dispatch, getState) => {
    const url = `${apiurl}/Locations`
    const data = {
      name: name,
      address: address
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(response => console.log('Success', JSON.stringify(response)))
    .catch(error => console.error('Error', error))
    .then(() => fetch(url))
    .then(res => res.json())
    .then(updatedLocations => dispatch({ type: updateLocationsListType, updatedLocations }))
  },
  editLocation: (name, address, id) => (dispatch, getState) => {
    const url = `${apiurl}/Locations/${id}`
    const data = {
      name: name,
      address: address,
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
    .then(() => fetch(`${apiurl}/Locations`))
    .then(res => res.json())
    .then(updatedLocations => dispatch({ type: updateLocationsListType, updatedLocations }))
  },
  deleteLocation: (id) => (dispatch, getState) => {
    const url = `${apiurl}/Locations/${id}`
    fetch(url, {
      method: 'DELETE'
    })
    .then(response => console.log('Success'))
    .catch(error => console.error('Error', error))
    .then(() => fetch(`${apiurl}/Locations`))
    .then(res => res.json())
    .then(updatedLocations => dispatch({ type: updateLocationsListType, updatedLocations }))
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestLocationsType) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === receiveLocationsType) {
    return {
      ...state,
      locations: action.locations,
      isLoading: false
    };
  }

  if (action.type === updateLocationsListType) {
    return {
      ...state,
      locations: action.updatedLocations
    }
  }


  return state;
};

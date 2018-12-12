const requestLocationsType = 'REQUEST_GIFTS';
const receiveLocationsType = 'RECEIVE_GIFTS';

const initialState = { locations: [], isLoading: false};

export const locationActionCreators = {
  requestLocations: id => async (dispatch, getState) => {
    dispatch({ type: requestLocationsType});

    const url = `api/Locations`;
    const response = await fetch(url);
    const locations = await response.json();

    dispatch({ type: receiveLocationsType, locations});
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



  return state;
};

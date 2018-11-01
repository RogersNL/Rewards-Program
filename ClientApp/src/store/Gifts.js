const requestGiftsType = 'REQUEST_GIFTS';
const receiveGiftsType = 'RECEIVE_GIFTS';
const initialState = { gifts: [], isLoading: false};

export const actionCreators = {
  requestGifts: id => async (dispatch, getState) => {
    dispatch({ type: requestGiftsType});

    const url = `api/Gift/Gifts`;
    const response = await fetch(url);
    const gifts = await response.json();

    dispatch({ type: receiveGiftsType, gifts});
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestGiftsType) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === receiveGiftsType) {
    return {
      ...state,
      gifts: action.gifts,
      isLoading: false
    };
  }

  return state;
};

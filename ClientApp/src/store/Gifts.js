const requestGiftsType = 'REQUEST_GIFTS';
const receiveGiftsType = 'RECEIVE_GIFTS';
const setGiftToEditType = 'SET_GIFT_TO_EDIT';
const initialState = { gifts: [], isLoading: false};

export const giftActionCreators = {
  requestGifts: id => async (dispatch, getState) => {
    dispatch({ type: requestGiftsType});

    const url = `api/Gift/Gifts`;
    const response = await fetch(url);
    const gifts = await response.json();

    dispatch({ type: receiveGiftsType, gifts});
  },
  setGiftToEdit: id => async (dispatch, getState) => {
    dispatch({ type: setGiftToEditType, id });
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

  if (action.type === setGiftToEditType) {
    const allGifts = state.gifts.slice();
    const giftToEdit = allGifts.find(gift => gift.id == action.id);
    console.log(action.id);
    return {
      ...state,
      giftToEdit: giftToEdit
    }
  }

  return state;
};

const requestGiftsType = 'REQUEST_GIFTS';
const receiveGiftsType = 'RECEIVE_GIFTS';
const setGiftToEditType = 'SET_GIFT_TO_EDIT';
const addGiftType = 'ADD_GIFT';
const initialState = { gifts: [], isLoading: false};

export const giftActionCreators = {
  requestGifts: id => async (dispatch, getState) => {
    dispatch({ type: requestGiftsType});

    const url = `api/Rewards`;
    const response = await fetch(url);
    const gifts = await response.json();
    dispatch({ type: receiveGiftsType, gifts});
  },
  setGiftToEdit: id => async (dispatch, getState) => {
    dispatch({ type: setGiftToEditType, id });
  },
  createNewGift: (name, description, pointValue) => async (dispatch, getState) => {
    const url = `api/Rewards`
    const data = {
      name: name,
      description: description,
      cost: pointValue
    }
    console.log(JSON.stringify(data));
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
      'Content-Type': 'application/json'
    }
    }).then(res => res.json())
    .then(response => console.log('Success', JSON.stringify(response)))
    .catch(error => console.error('Error', error));
  },
  editGift: (name, description, pointValue, giftId) => async (dispatch, getState) => {
    const url = `api/Rewards`
    const data = {
      name: name,
      description: description,
      pointValue: pointValue,
      giftId: giftId
    }
    console.log(JSON.stringify(data));
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers:{
      'Content-Type': 'application/json'
    }
    }).then(res => res.json())
    .then(response => console.log('Success', JSON.strigify(response)))
    .catch(error => console.error('Error', error));
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

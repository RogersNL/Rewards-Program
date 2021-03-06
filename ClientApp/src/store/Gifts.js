import { apiurl } from '../api';

const requestGiftsType = 'REQUEST_GIFTS';
const receiveGiftsType = 'RECEIVE_GIFTS';
const setGiftToEditType = 'SET_GIFT_TO_EDIT';
const addGiftType = 'ADD_GIFT';
const updateGiftListType = 'UPDATE_GIFT_LIST';

const initialState = { gifts: [], isLoading: false};

export const giftActionCreators = {
  requestGifts: id => async (dispatch, getState) => {
    dispatch({ type: requestGiftsType});

    const url = `${apiurl}/Rewards`;
    const response = await fetch(url);
    const gifts = await response.json();

    dispatch({ type: receiveGiftsType, gifts });

  },
  setGiftToEdit: id => (dispatch, getState) => {
    dispatch({ type: setGiftToEditType, id });
  },
  createNewGift: (name, description, pointValue) => (dispatch, getState) => {
    const url = `${apiurl}/Rewards`
    const data = {
      name: name,
      description: description,
      cost: pointValue
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
      'Content-Type': 'application/json'
    }
    }).then(res => res.json())
    .then(response => console.log('Success', JSON.stringify(response)))
    .catch(error => console.error('Error', error))
    .then(() => fetch(url))
    .then(res => res.json())
    .then(updatedGifts => dispatch({ type: updateGiftListType, updatedGifts }))
  },
  editGift: (name, description, pointValue, id) => (dispatch, getState) => {
    const url = `${apiurl}/Rewards/${id}`
    const data = {
      name: name,
      description: description,
      cost: pointValue,
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
    .then(() => fetch(`${`apiurl`}/Rewards`))
    .then(res => res.json())
    .then(updatedGifts => dispatch({ type: updateGiftListType, updatedGifts }))
  },
  deleteGift: (id) => (dispatch, getState) => {
    const url = `${apiurl}/Rewards/${id}`
    fetch(url, {
      method: 'DELETE'
    })
    .then(response => console.log('Success'))
    .catch(error => console.error('Error', error))
    .then(() => fetch(`${apiurl}/Rewards`))
    .then(res => res.json())
    .then(updatedGifts => dispatch({ type: updateGiftListType, updatedGifts }))
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
    return {
      ...state,
      giftToEdit: giftToEdit
    }
  }

  if (action.type === updateGiftListType) {
    return {
      ...state,
      gifts: action.updatedGifts
    }
  }

  return state;
};

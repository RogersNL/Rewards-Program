const requestTransactionsType = 'REQUEST_TRANSACTIONS';
const receiveTransactionsType = 'RECEIVE_TRANSACTIONS';
const initialState = { transactions: [], isLoading: false};

export const transactionActionCreators = {
  requestTransactions: id => async (dispatch, getState) => {
    dispatch({ type: requestTransactionsType});

    const url = `api/Transaction/Transactions`;
    const response = await fetch(url);
    const transactions = await response.json();

    dispatch({ type: receiveTransactionsType, transactions});
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === requestTransactionsType) {
    return {
      ...state,
      isLoading: true
    };
  }

  if (action.type === receiveTransactionsType) {
    return {
      ...state,
      transactions: action.transactions,
      isLoading: false
    };
  }

  return state;
};

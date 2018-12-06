const requestTransactionsType = 'REQUEST_TRANSACTIONS';
const receiveTransactionsType = 'RECEIVE_TRANSACTIONS';
const findUsersTransactionsType = 'FIND_USERS_TRANSACTIONS';
const initialState = { transactions: [], isLoading: false};

export const transactionActionCreators = {
  requestTransactions: id => async (dispatch, getState) => {
    dispatch({ type: requestTransactionsType});

    const url = `api/Transactions`;
    const response = await fetch(url);
    const transactions = await response.json();

    dispatch({ type: receiveTransactionsType, transactions});
  },
  findUsersTransactions: id => async (dispatch, getState) => {
    dispatch({ type: findUsersTransactionsType, id })
  },
  createTransaction: (userId, number, reason, adminId) => async (dispatch, getState) => {
    const url = `/api/Transactions`
    const data = {
      userId: userId,
      number: number,
      reason: reason,
      adminId: adminId,



    }
    console.log(JSON.stringify(data));
    const response = await fetch(url, {
      method: 'POST',
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
  if (action.type === findUsersTransactionsType) {
    let balance = 0;
    const transactionList = state.transactions.slice();
    const userTransactions = transactionList.filter(transaction => transaction.userId == action.id)
      .sort(function(a,b){
        return Date.parse(a.date) - Date.parse(b.date);
      })
      .map(function(a) {
      let o = Object.assign({}, a);
      o.balance = balance + o.points;
      balance = o.balance;
      return o;
    }).reverse();
    return {
      ...state,
      userTransactions: userTransactions
    }
  }
  return state;
};

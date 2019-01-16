import moment from 'moment';
import { apiurl } from '../api';

const requestTransactionsType = 'REQUEST_TRANSACTIONS';
const receiveTransactionsType = 'RECEIVE_TRANSACTIONS';
const findUsersTransactionsType = 'FIND_USERS_TRANSACTIONS';
const addTransactionType = 'ADD_TRANSACTION';
const initialState = { transactions: [], isLoading: false};

export const transactionActionCreators = {
  requestTransactions: id => async (dispatch, getState) => {
    dispatch({ type: requestTransactionsType});

    const url = `${apiurl}/Transactions`;
    const response = await fetch(url);
    const transactions = await response.json();

    dispatch({ type: receiveTransactionsType, transactions});
  },
  findUsersTransactions: id => (dispatch, getState) => {
    dispatch({ type: findUsersTransactionsType, id })
  },
  createTransaction: (userId, number, reason, adminId, date) => async (dispatch, getState) => {
    const url = `/${apiurl}/Transactions`
    const newTransaction = {
      userId: userId,
      points: number,
      name: reason,
      adminId: adminId,
      date: date
    }
    console.log(JSON.stringify(newTransaction));
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(newTransaction),
      headers:{
      'Content-Type': 'application/json'
    }
    }).then(res => res.json())
    .then(response => console.log('Success', JSON.stringify(response)))
    .then(() => fetch(url))
    .then(res => res.json())
    .then(newTransactions => dispatch({ type: addTransactionType, newTransactions }))
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
    const transactionsWithMoment = action.transactions.map(transaction => Object.assign(transaction, {date: moment(transaction.date, "ddd MMM DD YYYY LTS")}))
    return {
      ...state,
      transactions: transactionsWithMoment,
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
      })
      .reverse();
    return {
      ...state,
      userTransactions: userTransactions
    }
  }
  if (action.type === addTransactionType) {
    const transactionsWithMoment = action.newTransactions.map(transaction => Object.assign(transaction, {date: moment(transaction.date, "ddd MMM DD YYYY LTS")}))
    return {
      ...state,
      transactions: transactionsWithMoment
    }
  }
  return state;
};

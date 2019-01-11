import { transactionActionCreators, reducer } from './../../src/store/Transactions';
import moment from 'moment';

describe('transactionReducer', () => {
  const initialState = { transactions: [], isLoading: false};
  const sampleTransaction1 = {
    name: 'Transaction 1',
    date: moment().subtract(6, 'days').toString(),
    points: 100,
    userId: 1,
    adminId: 0,
    id: 0
  }
  const sampleTransaction2 = {
    name: 'Transaction 2',
    date: moment().subtract(4, 'days').toString(),
    points: 200,
    userId: 2,
    adminId: 0,
    id: 1
  }
  const sampleTransaction3 = {
    name: 'Transaction 3',
    date: moment().subtract(2, 'days').toString(),
    points: 300,
    userId: 1,
    adminId: 0,
    id: 2
  }

  it('Should return default state if no action type is recognized', () => {
    expect(reducer(initialState, { type: null })).toEqual(initialState)
  });

  it('Should set isLoading to true', () => {
    const expectedState = Object.assign(initialState, {isLoading: true})
    expect(reducer(initialState, {type:'REQUEST_TRANSACTIONS'})).toEqual(expectedState)
  })

  it('Should set transactions to the state and set isLoading to false', () => {
    const transactions = [sampleTransaction1, sampleTransaction2, sampleTransaction3]
    const transactionsWithMoment = [Object.assign(sampleTransaction1, {date: moment(sampleTransaction1.date, "ddd MMM DD YYYY LTS")}), Object.assign(sampleTransaction2, {date: moment(sampleTransaction2.date, "ddd MMM DD YYYY LTS")}), Object.assign(sampleTransaction3, {date: moment(sampleTransaction3.date, "ddd MMM DD YYYY LTS")})]
    const previousState = Object.assign(initialState, {isLoading: true})
    const expectedState = Object.assign(previousState, {transactions: transactionsWithMoment, isLoading: false})
    expect(reducer(previousState, {type:'RECEIVE_TRANSACTIONS', transactions})).toEqual(expectedState)
  })

  it('Should set transactions for a specific user', () => {
    const transactions = [sampleTransaction1, sampleTransaction2, sampleTransaction3]
    const userTransactions = [Object.assign(sampleTransaction3, {balance:400}), Object.assign(sampleTransaction1, {balance: 100})]
    const id = sampleTransaction1.userId
    const previousState = Object.assign(initialState, {transactions:transactions})
    const expectedState = Object.assign(previousState, {userTransactions: userTransactions})
    expect(reducer(previousState, {type:'FIND_USERS_TRANSACTIONS', id})).toEqual(expectedState)
  })

  it('Should add transactions', () => {
    const transactions = [sampleTransaction1, sampleTransaction2, sampleTransaction3]
    const sampleTransaction4 = {
      name: 'Transaction 4',
      date: moment().subtract(5, 'days').toString(),
      points: 400,
      userId: 1,
      adminId: 0,
      id: 3
    }
    const newTransactions = [sampleTransaction1, sampleTransaction2, sampleTransaction3, sampleTransaction4]
    const previousState = Object.assign(initialState, {transactions: transactions})
    const expectedState = Object.assign(previousState, {transactions: newTransactions})
    expect(reducer(previousState, {type:'ADD_TRANSACTION', newTransactions})).toEqual(expectedState)
  })
});

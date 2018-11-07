import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/Transactions';

class Transactions extends Component {
  componentWillMount() {
    this.props.requestTransactions();
  }

  render() {
    return (
      <div>
        <h1>Transaction History</h1>
        <p>Here's where you're earning points.</p>
        {renderTransactionsTable(this.props)}
      </div>
    )
  }
}

function renderTransactionsTable(props) {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Points</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {props.transactions.map(transaction =>
        <tr key={transaction.id}>
          <td>{transaction.name}</td>
          <td>{transaction.date}</td>
          <td>{transaction.points}</td>
          <td>temp</td>
        </tr>)}
      </tbody>
    </table>
  );
}
export default connect(
  state => state.transactions,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Transactions);

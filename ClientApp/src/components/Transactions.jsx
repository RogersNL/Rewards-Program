import React from 'react';
import PropTypes from 'prop-types';

function Transactions(props) {
  function renderTransactionsTable(props) {
    if(props.transactionList){
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
            {props.transactionList.map(transaction =>
              <tr key={transaction.id}>
                <td>{transaction.name}</td>
                <td>{transaction.date}</td>
                <td>{transaction.points}</td>
                <td>temp</td>
              </tr>)}
            </tbody>
          </table>
        );
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }
  return (
    <div>
      <h1>Username</h1>
      <p>Current Points: </p>
      <p>Lifetime Points: </p>
      <hr />
      <h2>History</h2>
      {renderTransactionsTable(props)}
    </div>
  )
}

Transactions.propTypes = {
  transactionList: PropTypes.array
};

export default Transactions;

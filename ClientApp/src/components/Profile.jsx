import React from 'react';
import PropTypes from 'prop-types';

function Profile(props) {
  function renderTransactionsTable(props) {
    if(props.transactionList){
      return (
        <table className='table'>
          <thead>
            <tr>
              <th>Description</th>
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
                <td>{transaction.balance}</td>
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
  function handleRenderUserInfo(props){
    if(props.loggedInUser){
      return(
        <div>
          <h1>{props.loggedInUser.name}</h1>
          <p>Current Points: {props.loggedInUser.currentPoints}</p>
          <p>Lifetime Points: {props.loggedInUser.lifetimePoints}</p>
        </div>
      )
    }
  }
  return (
    <div>
      {handleRenderUserInfo(props)}
      <hr />
      <h2>History</h2>
      {renderTransactionsTable(props)}
      {console.log(props.appState.users.users.value)}
    </div>
  )
}

Profile.propTypes = {
  transactionList: PropTypes.array,
  loggedInUser: PropTypes.object,
  appState: PropTypes.object
};

export default Profile;

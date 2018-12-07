import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.renderTransactionsTable = this.renderTransactionsTable.bind(this);
    this.handleRenderUserInfo = this.handleRenderUserInfo.bind(this);
  }
  renderTransactionsTable() {
    if(this.props.transactionList){
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
            {this.props.transactionList.map(transaction =>
              <tr key={transaction.employeeId}>
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
  handleRenderUserInfo(){
    if(this.props.loggedInUser){
      return(
        <div>
          <h1>{this.props.loggedInUser.name}</h1>
          <p>Current Points: {this.props.loggedInUser.currentPoints}</p>
          <p>Lifetime Points: {this.props.loggedInUser.lifetimePoints}</p>
        </div>
      )
    }
  }
  render(){
    return (
      <div>
        {this.handleRenderUserInfo()}
        <hr />
        <h2>History</h2>
        {this.renderTransactionsTable()}
        {console.log(this.props.appState)}
      </div>
    )
  }
}

Profile.propTypes = {
  transactionList: PropTypes.array,
  loggedInUser: PropTypes.object,
  appState: PropTypes.object
};

export default Profile;

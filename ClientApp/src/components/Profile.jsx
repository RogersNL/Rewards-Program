import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      transactions: null
    };
    this.renderTransactionsTable = this.renderTransactionsTable.bind(this);
    this.handleRenderUserInfo = this.handleRenderUserInfo.bind(this);
    this.handleSettingCurrentUser = this.handleSettingCurrentUser.bind(this);
    this.handleSettingTransactions = this.handleSettingTransactions.bind(this);
  }

  componentDidMount(){
    this.handleSettingCurrentUser();
    this.handleSettingTransactions();
  }
  componentWillReceiveProps(){
    this.handleSettingCurrentUser();
    this.handleSettingTransactions();
  }
  componentDidUpdate(prevProps){
    if (prevProps.loggedInUser !== this.props.loggedInUser){
      this.handleSettingCurrentUser();
    }
    if (prevProps.transactionList !== this.props.transactionList){
      this.handleSettingTransactions();
    }
  }

  handleSettingCurrentUser() {
    this.setState({
      user: this.props.loggedInUser
    })
  }
  handleSettingTransactions() {
    let balance = 0;
    const userId = this.props.loggedInUser.employeeId;
    const userTransactions = this.props.transactionList.filter(transaction => transaction.userId == userId)
      .sort(function(a,b){
        return Date.parse(a.date) - Date.parse(b.date);
      })
      .map(function(a) {
      let o = Object.assign({}, a);
      o.balance = balance + o.points;
      balance = o.balance;
      return o;
    }).reverse();
    this.setState({
      transactions: userTransactions
    })
  }
  renderTransactionsTable() {
    if(this.state.transactions){
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
            {this.state.transactions.map(transaction =>
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
  handleRenderUserInfo(){
    if(this.state.user){
      return(
        <div>
          <h1>{this.state.user.name}</h1>
          <p>Current Points: {this.state.user.currentPoints}</p>
          <p>Lifetime Points: {this.state.user.lifetimePoints}</p>
        </div>
      )
    }
  }
  render(){
    return (
      <div>
        {this.handleRenderUserInfo()}
        <hr />
        {console.log(this.props.appState)}
        <h2>History</h2>
        {this.renderTransactionsTable()}
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

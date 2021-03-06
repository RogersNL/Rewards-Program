import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button, Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

class UserPointsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      transactions: null,
      number: '',
      reason: ''
    };
    this.handleFindingCurrentUser = this.handleFindingCurrentUser.bind(this);
    this.handleUserPointsFormSubmit = this.handleUserPointsFormSubmit.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleReasonChange = this.handleReasonChange.bind(this);
    this.handleRenderUserTransactions = this.handleRenderUserTransactions.bind(this);
    this.handleRenderPointsForm = this.handleRenderPointsForm.bind(this);
  }
  componentDidMount(){
    this.handleFindingCurrentUser();
    this.handleFindingUsersTransactions();
  }
  componentWillReceiveProps(){
    this.handleFindingCurrentUser();
    this.handleFindingUsersTransactions();
  }
  componentDidUpdate(prevProps){
    if (prevProps.transactionList !== this.props.transactionList){
      this.handleFindingUsersTransactions();
    }
    if (prevProps.userList !== this.props.userList){
      this.handleFindingCurrentUser();
    }
  }
  handleUserPointsFormSubmit(event) {
    event.preventDefault();

    this.props.createTransaction(parseInt(this.props.location.split('/')[2]), parseInt(this.state.number), this.state.reason, parseInt(this.props.adminUserId), moment().toString());

    const user = this.state.user;
    let updatedUser = {};
    if(this.state.number >= 0){
      updatedUser = Object.assign({}, user, {currentPoints: parseInt(this.state.user.currentPoints) + parseInt(this.state.number), lifetimePoints: parseInt(this.state.user.lifetimePoints) + parseInt(this.state.number)});
    } else {
      updatedUser = Object.assign({}, user, {currentPoints: parseInt(this.state.user.currentPoints) + parseInt(this.state.number), lifetimePoints: parseInt(this.state.user.lifetimePoints)});
    }

    this.props.updateUser(this.props.location.split('/')[2], updatedUser);

    this.setState({
      number: '',
      reason: ''
    })
  }
  handleNumberChange(event) {
    this.setState({
      number: event.target.value
    })
  }
  handleReasonChange(event) {
    this.setState({
      reason: event.target.value
    })
  }
  handleFindingCurrentUser() {
    const userId = this.props.location.split('/')[2];
    const currentUser = this.props.userList.find(user => user.employeeId == userId);
    this.setState({
      user: currentUser
    })
  }
  handleFindingUsersTransactions() {
    let balance = 0;
    const userId = this.props.location.split('/')[2];
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
  handleRenderUserTransactions() {
    return(
      <table className='table'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Date</th>
            <th>Admin</th>
            <th>Points</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {this.state.transactions.map(transaction =>
            <tr key={transaction.id}>
              <td>{transaction.name}</td>
              <td>{transaction.date.format("llll")}</td>
              <td>{this.props.userList.find(user => transaction.adminId == this.props.adminUserId).name}</td>
              <td>{transaction.points}</td>
              <td>{transaction.balance}</td>
            </tr>)}
        </tbody>
      </table>
    )
  }
  handleRenderPointsForm(){
    return(
      <form onSubmit={this.handleUserPointsFormSubmit}>
        <FormGroup>
          <ControlLabel>Add/Remove Points</ControlLabel>
          <FormControl value={this.state.number} onChange={this.handleNumberChange} type="number" placeholder="Add/Remove Points"></FormControl>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Reason</ControlLabel>
          <FormControl value={this.state.reason} onChange={this.handleReasonChange} type="text" placeholder="Reason"></FormControl>
        </FormGroup>
        <Button type="submit" bsStyle="success">Submit</Button>
      </form>
    )
  }
  render(){
    if(this.state.user) {
      return (
      <div>
        <Link to="/manage-users"><Button className="backButton" bsStyle="primary">Back To List</Button></Link>
        <h1>{this.state.user.name}</h1>
        <p>Current Points: {this.state.user.currentPoints}</p>
        <p>Lifetime Points: {this.state.user.lifetimePoints}</p>
        <hr/>
        {this.handleRenderPointsForm()}
        <hr/>
        <h3>Transactions</h3>
        {this.handleRenderUserTransactions()}
        <style>{`
          .backButton {
            float: right;
            margin-right: 30px;
          }
        `}</style>
        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      )
    }
  }
}
UserPointsForm.propTypes = {
  userList: PropTypes.array,
  transactionList: PropTypes.array,
  location: PropTypes.string,
  createTransaction: PropTypes.func,
  adminUserId: PropTypes.number,
  requestTransactions: PropTypes.func,
  updateUser: PropTypes.func
}
export default UserPointsForm;

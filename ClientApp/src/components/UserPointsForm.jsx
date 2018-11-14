import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

class UserPointsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      number: '',
      reason: ''
    };
    this.handleFindingCurrentUser = this.handleFindingCurrentUser.bind(this);
    this.handleUserPointsFormSubmit = this.handleUserPointsFormSubmit.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleReasonChange = this.handleReasonChange.bind(this);
  }
  componentDidMount(){
    this.handleFindingCurrentUser();
  }
  componentWillReceiveProps(){
    this.handleFindingCurrentUser();
  }

  handleUserPointsFormSubmit(event) {
    event.preventDefault();
    console.log(this.state);
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
    const currentUser = this.props.userList.find(user => user.id == userId);
    this.setState({
      user: currentUser
    })
  }

  render(){
    if(this.state.user) {
      return (
      <div>
        <h1>{this.state.user.name}</h1>
        <p>Current Points: {this.state.user.currentPoints}</p>
        <p>Lifetime Points: {this.state.user.lifetimePoints}</p>
        <hr/>
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
        <hr/>

        <style>{`

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
  location: PropTypes.string
}
export default UserPointsForm;

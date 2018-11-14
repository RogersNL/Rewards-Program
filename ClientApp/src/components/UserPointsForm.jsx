import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

class UserPointsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.handleFindingCurrentUser = this.handleFindingCurrentUser.bind(this);
    this.handleUserPointsFormSubmit = this.handleUserPointsFormSubmit.bind(this);
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
            <ControlLabel>Add</ControlLabel>
            <FormControl value={this.state._name} onChange={this.handleNameChange} type="text" placeholder="a"></FormControl>
          </FormGroup>
        </form>
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

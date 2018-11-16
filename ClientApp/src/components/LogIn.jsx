import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

class LogIn extends Component {
  constructor(props){
    super(props);
    this.state ={
      _admin: '0'
    };
    this.handleLogInFormSubmit = this.handleLogInFormSubmit.bind(this);
    this.handleMenuChange = this.handleMenuChange.bind(this);
  }
  handleLogInFormSubmit(event){
    event.preventDefault();
    this.props.logInUser(this.state._admin);
    this.props.findUsersTransactions(this.state._admin);
  }
  handleMenuChange(event){
    this.setState({
      _admin: event.target.value
    });
  }

  render(){
    return (
      <div>
        <form onSubmit={this.handleLogInFormSubmit}>
          <FormGroup>
            <ControlLabel>Log In</ControlLabel>
              <FormControl value={this.state._admin} onChange={this.handleMenuChange} componentClass="select" placeholder="select">
                <option value="0">0 Not Admin</option>
                <option value="1">1 Admin</option>
                <option value="2">2 Admin</option>
              </FormControl>
            <Button bsStyle="success" type="submit">Log In</Button>
          </FormGroup>
        </form>
      </div>
    );
  }
}
LogIn.propTypes = {
  logInUser: PropTypes.func,
  findUsersTransactions: PropTypes.func
}
export default LogIn;

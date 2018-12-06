import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, FormGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class ManageUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      users: []
    };
    this.handleRenderUsersTable = this.handleRenderUsersTable.bind(this);
    this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
    this.handleUpdatingUserList = this.handleUpdatingUserList.bind(this);
  }
  //Set value in form to state
  handleSearchValueChange(event) {
    this.setState({
      search: event.target.value,
      users: this.handleUpdatingUserList(event.target.value)
    })
  }
  //Change the shown users while searching in real time
  handleUpdatingUserList(searchValue) {
    if(this.props.userList.length != 0){
      if(searchValue === '') {
        return [];
      } else {
        const propsList = this.props.userList.slice();
        return propsList.filter(user => user.name.toLowerCase().includes(searchValue.toLowerCase()));
      }
    } else {
      return [];
    }
  }
  //Show table
  handleRenderUsersTable(props) {
    if(props.userList){
      return (
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Current Points</th>
              <th>Lifetime Points</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user, index) =>
              <tr key={user.employeeId}>
                <td>{user.name}</td>
                <td>{user.location}</td>
                <td>{user.currentPoints}</td>
                <td>{user.lifetimePoints}</td>
                <td><Link to={{pathname: `/user/${user.employeeId}`}}><Button bsStyle='warning'>Add/Deduct Points</Button></Link></td>
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
  render(){
    return (
      <div>
        <h1>Manage Users</h1>
        <p>Manage iLink Rewards Accounts</p>
        {console.log(this.state.users)}
        <div>
          <form>
            <FormGroup>
              <FormControl
                placeholder="Search User By Name"
                type="text"
                onChange={this.handleSearchValueChange}
                ></FormControl>
            </FormGroup>
          </form>
        </div>
        {this.handleRenderUsersTable(this.props)}
      </div>
    )
  }
}

ManageUsers.propTypes = {
  userList: PropTypes.array
};

export default ManageUsers;

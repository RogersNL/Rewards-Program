import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, FormGroup } from 'react-bootstrap'

class ManageUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      users: []
    };
    this.handleRenderUsersTable = this.handleRenderUsersTable.bind(this);
    this.handleSearchUsersFormSubmit = this.handleSearchUsersFormSubmit.bind(this);
    this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
    this.handleUpdatingUserList = this.handleUpdatingUserList.bind(this);
  }
  handleSearchValueChange(event) {
    this.setState({
      search: event.target.value,
      users: this.handleUpdatingUserList(event.target.value)
    })
  }
  handleUpdatingUserList(searchValue) {
    const propsList = this.props.userList.slice();
    return propsList.filter(user => user.name.toLowerCase().includes(searchValue.toLowerCase()));
  }
  handleSearchUsersFormSubmit(event) {
    event.preventDefault()
    console.log(this.state)
  }
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
              <th>Is Admin</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user, index) =>
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.location}</td>
                <td>{user.currentPoints}</td>
                <td>{user.lifetimePoints}</td>
                <td>{user.isAdmin}</td>
                <td><Button bsStyle='warning'>Add/Deduct Points</Button></td>
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
        <div>
          <form onSubmit={this.handleSearchUsersFormSubmit}>
            <FormGroup>
              <FormControl
                placeholder="Search"
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

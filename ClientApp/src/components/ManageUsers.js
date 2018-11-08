import React from 'react';
import PropTypes from 'prop-types';

function ManageUsers(props) {
  function renderUsersTable(props) {
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
            {props.userList.map((user, index) =>
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.location}</td>
                <td>{user.currentPoints}</td>
                <td>{user.lifetimePoints}</td>
                <td>{user.isAdmin}</td>
                <td><button className='btn btn-warning'>Edit</button></td>
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
      <h1>Manage Users</h1>
      <p>Manage iLink Rewards Accounts</p>
      {renderUsersTable(props)}
    </div>
  )
}

ManageUsers.propTypes = {
  userList: PropTypes.array
};

export default ManageUsers;

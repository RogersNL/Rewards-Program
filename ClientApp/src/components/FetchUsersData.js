import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/Users';

class FetchUsersData extends Component {
  componentWillMount() {
    this.props.requestUsers();
  }

  render() {
    return (
      <div>
        <h1>Leaderboard</h1>
        <p>Top earners in iLink.</p>
        {renderLeaderboardTable(this.props)}
      </div>
    )
  }
}

function renderLeaderboardTable(props) {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Location</th>
          <th>Lifetime Points</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map(user =>
        <tr key={user.id}>
          <td>{user.id + 1}</td>
          <td>{user.name}</td>
          <td>{user.location}</td>
          <td>{user.lifetimePoints}</td>
        </tr>)}
      </tbody>
    </table>
  );
}
export default connect(
  state => state.users,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(FetchUsersData);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Leaderboard(props) {
  function renderLeaderboardTable(props) {
    if(props.userList){
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
          {props.userList.map((user, index) =>
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.location}</td>
              <td>{user.lifetimePoints}</td>
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
      <h1>Leaderboard</h1>
      <p>Top earners in iLink.</p>
      {renderLeaderboardTable(props)}
    </div>
  )
}

Leaderboard.propTypes = {
  userList: PropTypes.array
};

export default Leaderboard;

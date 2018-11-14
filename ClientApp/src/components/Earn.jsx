import React from 'react';
import PropTypes from 'prop-types';

function Earn(props) {
  function renderPostsTable(props) {
    if(props.postList) {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Point Value</th>
            <th>Offer Expires</th>
          </tr>
        </thead>
        <tbody>
          {props.postList.map(post =>
            <tr key={post.id}>
              <td>{post.name}</td>
              <td>{post.description}</td>
              <td>{post.pointValue}</td>
              <td>{post.dateClosed}</td>
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
      <h1>Earn</h1>
      <p>Here are some ways you can earn more points!</p>
      {renderPostsTable(props)}
    </div>
  )
}

Earn.propTypes = {
  postList: PropTypes.array
};

export default Earn;

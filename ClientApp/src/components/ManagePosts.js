import React from 'react';
import PropTypes from 'prop-types';

function ManagePosts(props) {
  function renderPostsTable(props) {
    if(props.posts) {
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
          {props.posts.posts.map(post =>
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
      <h1>Manage Posts</h1>
      <p>Create/Edit Posts</p>
      {renderPostsTable(props)}
    </div>
  )
}

ManagePosts.propTypes = {
  posts: PropTypes.object
};

export default ManagePosts;

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/Posts';

class FetchPostsData extends Component {
  componentWillMount() {
    this.props.requestPosts();
  }

  render() {
    return (
      <div>
        <h1>Earn</h1>
        <p>Here are some ways you can earn more points!</p>
        {renderPostsTable(this.props)}
      </div>
    )
  }
}

function renderPostsTable(props) {
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
        {props.posts.map(post =>
        <tr key={post.id}>
          <td>{post.name}</td>
          <td>{post.description}</td>
          <td>{post.pointValue}</td>
          <td>{post.dateClosed}</td>
        </tr>)}
      </tbody>
    </table>
  );
}
export default connect(
  state => state.posts,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(FetchPostsData);

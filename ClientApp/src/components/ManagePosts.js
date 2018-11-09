import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ButtonGroup, Button, DropdownButton, MenuItem } from 'react-bootstrap';

function ManagePosts(props) {
  function handleFilteringPostsByLocation(location){
    props.filterByLocation(location);
    console.log(location);
    console.log(props)
  }
  function renderPostsTable(props) {
    if(props.posts.filteredPosts){
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
            {props.posts.filteredPosts.map(post =>
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
      <Link to='/new-post'><Button className="newPostButton" bsStyle="primary">Create New Post</Button></Link>
      <h1>Manage Posts</h1>
      <p>Create/Edit Posts</p>
        <ButtonGroup>
          <Button>1</Button>
          <Button>2</Button>
          <DropdownButton title="Sort By Location" id="bg-nested-dropdown">
            <MenuItem eventKey="Bothell" onSelect={handleFilteringPostsByLocation}>Bothell</MenuItem>
            <MenuItem eventKey="Virginia" onSelect={handleFilteringPostsByLocation}>Virginia</MenuItem>
            <MenuItem eventKey="Atlanta" onSelect={handleFilteringPostsByLocation}>Atlanta</MenuItem>
            <MenuItem eventKey="Houston" onSelect={handleFilteringPostsByLocation}>Houston</MenuItem>
            <MenuItem eventKey="Los Angeles" onSelect={handleFilteringPostsByLocation}>Los Angeles</MenuItem>
            <MenuItem eventKey="Chennai" onSelect={handleFilteringPostsByLocation}>Chennai</MenuItem>
            <MenuItem eventKey="Pune" onSelect={handleFilteringPostsByLocation}>Pune</MenuItem>
            <MenuItem eventKey="Trichy" onSelect={handleFilteringPostsByLocation}>Trichy</MenuItem>
            <MenuItem eventKey="Malaysia" onSelect={handleFilteringPostsByLocation}>Malaysia</MenuItem>
            <MenuItem eventKey="U.A.E" onSelect={handleFilteringPostsByLocation}>U.A.E</MenuItem>
          </DropdownButton>
        </ButtonGroup>
      {renderPostsTable(props)}
      <style jsx>{`
        .newPostButton {
          float:right;
          margin-right: 40px;
        }
      `}</style>
    </div>
  )
}

ManagePosts.propTypes = {
  posts: PropTypes.object,
  filterByLocation: PropTypes.func
};

export default ManagePosts;

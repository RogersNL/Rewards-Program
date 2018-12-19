import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button, DropdownButton, MenuItem } from 'react-bootstrap';

function Earn(props) {
  //Action Creators from Props
  function handleFilteringPostsByLocation(location){
    props.filterByLocation(location);
  }
  function handleFilteringPostsByDate(value){
    props.filterByDate(value);
  }
  //Choose which table to render
  function renderPostsTable(props) {
    if(props.posts.currentPosts) {
      return (
        <table className='table'>
          <thead>
            <tr>
              <th>Event</th>
              <th>Description</th>
              <th>Location</th>
              <th>Point Value</th>
              <th>Offer Expires</th>
            </tr>
          </thead>
          <tbody>
            {props.posts.currentPosts.map(post =>
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.description}</td>
                <td>{props.locations.find(location => location.id == post.locationId).name}</td>
                <td>{post.pointValue}</td>
                <td>{post.dateClosed.format("l")}</td>
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
  function renderFilterButtons() {
    return(
      <ButtonGroup>
        <DropdownButton title="Sort By Date" id="bg-nested-dropdown">
          <MenuItem eventKey="1" onSelect={handleFilteringPostsByDate}>Newest To Oldest</MenuItem>
          <MenuItem eventKey="2" onSelect={handleFilteringPostsByDate}>Oldest To Newest</MenuItem>
        </DropdownButton>
        <DropdownButton title="Filter By Location" id="bg-nested-dropdown">
          <MenuItem eventKey="All" onSelect={handleFilteringPostsByLocation}>All Locations</MenuItem>
          {props.locations.map(location =>
            <MenuItem key={location.id} eventKey={location.id} onSelect={handleFilteringPostsByLocation}>{location.name}</MenuItem>
          )}
        </DropdownButton>
      </ButtonGroup>
    )
  }
  return (
    <div>
      <h1>Earn</h1>
      <p>Here are some ways you can earn more points!</p>
      {renderFilterButtons()}
      {renderPostsTable(props)}
    </div>
  )
}

Earn.propTypes = {
  posts: PropTypes.object,
  filterByLocation: PropTypes.func,
  filterByDate: PropTypes.func,
  locations: PropTypes.array
};

export default Earn;

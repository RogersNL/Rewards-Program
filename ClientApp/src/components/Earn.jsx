import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button, DropdownButton, MenuItem } from 'react-bootstrap';

class Earn extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: []
    }
    this.handleFilteringPostsByDate = this.handleFilteringPostsByDate.bind(this);
    this.handleFilteringPostsByLocation = this.handleFilteringPostsByLocation.bind(this);
    this.handleRenderPostsTable = this.handleRenderPostsTable.bind(this);
    this.handleRenderFilterButtons = this.handleRenderFilterButtons.bind(this);
  }
  componentDidMount(){
    this.handleSettingPostsToState();
  }
  componentWillReceiveProps(){
    this.handleSettingPostsToState();
  }
  //Action Creators from Props
  handleFilteringPostsByLocation(location){
    if(location === "All Locations"){
      this.handleSettingPostsToState();
    } else {
      const filteredPosts = this.props.posts.posts.slice().filter(post => post.locationId == location).reverse()
      this.setState({
        posts: filteredPosts
      })
    }
  }
  handleSettingPostsToState() {
    const postsList = this.props.posts.currentPosts.slice().reverse();
    this.setState({
      posts: postsList
    })
  }
  handleFilteringPostsByDate(value){
    let sortedPosts = []
    if(value === "1"){
      sortedPosts = this.props.posts.posts.slice().sort((a,b) => b.dateOpened - a.dateOpened)
    } else if(value === "2"){
      sortedPosts = this.props.posts.posts.slice().sort((a,b) => a.dateOpened - b.dateOpened)
    } else if(value === "3"){
      sortedPosts = this.props.posts.posts.slice().sort((a,b) => a.dateClosed - b.dateClosed)
    } else if(value === "4"){
      sortedPosts = this.props.posts.posts.slice().sort((a,b) => b.dateClosed - a.dateClosed)
    }
    this.setState({
      posts: sortedPosts
    })
  }
  //Choose which table to render
  handleRenderPostsTable() {
    if(this.props.posts) {
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
            {this.state.posts.map(post =>
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.description}</td>
                <td>{this.props.locations.find(location => location.id == post.locationId).name}</td>
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
  handleRenderFilterButtons() {
    if(this.props.locations){
      return(
        <ButtonGroup>
          <DropdownButton title="Sort By Date" id="bg-nested-dropdown">
            <MenuItem eventKey="1" onSelect={this.handleFilteringPostsByDate}>Expires Sooner To Later</MenuItem>
            <MenuItem eventKey="2" onSelect={this.handleFilteringPostsByDate}>Expires Later To Sooner</MenuItem>
          </DropdownButton>
          <DropdownButton title="Filter By Location" id="bg-nested-dropdown">
            <MenuItem eventKey="All Locations" onSelect={this.handleFilteringPostsByLocation}>All Locations</MenuItem>
            {this.props.locations.map(location =>
              <MenuItem key={location.id} eventKey={location.id} onSelect={this.handleFilteringPostsByLocation}>{location.name}</MenuItem>
            )}
          </DropdownButton>
        </ButtonGroup>
      )
    }
  }
  render(){
    return (
      <div>
        <h1>Earn</h1>
        <p>Here are some ways you can earn more points!</p>
        {this.handleRenderFilterButtons()}
        {this.handleRenderPostsTable()}
      </div>
    )
  }
}

Earn.propTypes = {
  posts: PropTypes.object,
  locations: PropTypes.array
};

export default Earn;

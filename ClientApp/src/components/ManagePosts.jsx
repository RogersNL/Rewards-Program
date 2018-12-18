import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ButtonGroup, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import NewPostForm from './NewPostForm';

class ManagePosts extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: []
    }
    this.handleFilteringPostsByLocation = this.handleFilteringPostsByLocation.bind(this);
    this.handleFilteringPostsByDate = this.handleFilteringPostsByDate.bind(this);
    this.renderFilterButtons = this.renderFilterButtons.bind(this);
    this.handleSettingPostToEdit = this.handleSettingPostToEdit.bind(this);
    this.renderPostsTable = this.renderPostsTable.bind(this);
    this.handleSettingPostsToState = this.handleSettingPostsToState.bind(this);
  }
  componentDidMount(){
    this.handleSettingPostsToState();
  }
  componentWillReceiveProps(){
    this.handleSettingPostsToState();
  }
  componentDidUpdate(prevProps){
    if (prevProps.posts !== this.props.posts) {
      this.handleSettingPostsToState()
    }
  }
  //Filtering and Sorting Action Creators
  handleFilteringPostsByLocation(location){
    this.props.filterByLocation(location);
  }
  handleFilteringPostsByDate(value){
    this.props.filterByDate(value);
  }
  //Filter Buttons
  renderFilterButtons() {
    if(this.props.locations){
      return(
        <ButtonGroup>
          <DropdownButton title="Sort By Date" id="bg-nested-dropdown">
            <MenuItem eventKey="1" onSelect={this.handleFilteringPostsByDate}>Newest To Oldest</MenuItem>
            <MenuItem eventKey="2" onSelect={this.handleFilteringPostsByDate}>Oldest To Newest</MenuItem>
          </DropdownButton>
          <DropdownButton title="Filter By Location" id="bg-nested-dropdown">
            <MenuItem eventKey="All" onSelect={this.handleFilteringPostsByLocation}>All Locations</MenuItem>
            {this.props.locations.map(location =>
              <MenuItem key={location.id} eventKey={location.id} onSelect={this.handleFilteringPostsByLocation}>{location.name}</MenuItem>
            )}
          </DropdownButton>
        </ButtonGroup>
      )
    }
  }
  //Send id to set post to edit
  handleSettingPostToEdit(id) {
    this.props.setPost(id);
  }
  handleSettingPostsToState() {
    const postsList = this.props.posts.posts.reverse();
    this.setState({
      posts: postsList
    })
  }

  //Choose which table to render
  renderPostsTable(props) {
    if(this.props.posts.filteredPosts){
      return (
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Location</th>
              <th>Point Value</th>
              <th>Offer Expires</th>
            </tr>
          </thead>
          <tbody>
            {this.props.posts.filteredPosts.map(post =>
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.description}</td>
                <td>{this.props.locations.find(location => location.id == post.locationId).name}</td>
                <td>{post.pointValue}</td>
                <td>{post.dateClosed}</td>
                <td><Link to="/edit-post"><Button onClick={()=>this.handleSettingPostToEdit(post.id)} className="editButton" bsStyle="warning">Edit</Button></Link></td>
              </tr>)}
            </tbody>
          </table>
        );
    } else if(this.props.posts) {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
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
              <td>{post.dateClosed}</td>
              <td><Link to="/edit-post"><Button onClick={()=>this.handleSettingPostToEdit(post.id)} className="editButton" bsStyle="warning">Edit</Button></Link></td>
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
        <h1>Manage Posts</h1>
        <p>Create/Edit Posts</p>
        <hr />
        <NewPostForm createPost={this.props.createPost} locations={this.props.locations} />
        <hr />
        <h3>Posts</h3>
        {this.renderFilterButtons()}
        {this.renderPostsTable()}
        <style>{`
          .newPostButton {
            float:right;
            margin-right: 40px;
          }
        `}</style>
      </div>
    )
  }
}

ManagePosts.propTypes = {
  posts: PropTypes.object,
  filterByLocation: PropTypes.func,
  filterByDate: PropTypes.func,
  setPost: PropTypes.func,
  locations: PropTypes.array,
  createPost: PropTypes.func
};

export default ManagePosts;

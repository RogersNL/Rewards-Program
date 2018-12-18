import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ButtonGroup, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import NewPostForm from './NewPostForm';
import EditPost from './EditPost';
import moment from 'moment';

class ManagePosts extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      postToEdit: null,
      postToDelete: null
    }
    this.handleFilteringPostsByLocation = this.handleFilteringPostsByLocation.bind(this);
    this.handleFilteringPostsByDate = this.handleFilteringPostsByDate.bind(this);
    this.renderFilterButtons = this.renderFilterButtons.bind(this);
    this.handleSettingPostToEdit = this.handleSettingPostToEdit.bind(this);
    this.renderPostsTable = this.renderPostsTable.bind(this);
    this.handleSettingPostsToState = this.handleSettingPostsToState.bind(this);
    this.handleEditStateChange = this.handleEditStateChange.bind(this);
    this.handleDeleteStateChange = this.handleDeleteStateChange.bind(this);
    this.handleSettingPostToDelete = this.handleSettingPostToDelete.bind(this);
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
    const postToEdit = this.state.posts.find(post => post.id == id)
    console.log(postToEdit)
    this.setState({
      postToEdit: postToEdit
    })
  }
  handleSettingPostsToState() {
    const postsList = this.props.posts.posts.reverse();
    this.setState({
      posts: postsList
    })
  }
  handleEditStateChange() {
    this.setState({
      postToEdit: null
    })
  }
  handleDeleteStateChange() {
    this.setState({
      postToDelete: null
    })
  }
  handleSettingPostToDelete(id) {
    const postToDelete = this.state.posts.find(post => post.id == id)
    this.setState({
      postToDelete: postToDelete
    })
  }
  handleDeletingPost(){
    this.props.deletePost(this.state.postToDelete.id);
    this.setState({
      postToDelete: null
    })
  }
  handleVisibleContent(){
    if(this.state.postToEdit){
      return (
        <EditPost editPost={this.props.editPost} postToEdit={this.state.postToEdit} hideEdit={this.handleEditStateChange} locations={this.props.locations}/>
      )
    } else if (this.state.postToDelete) {
      return (
        <div>
          <h3>Delete this Post?</h3>
          <div><strong>Name:</strong> {this.state.postToDelete.title}</div>
          <div><strong>Description:</strong> {this.state.postToDelete.description}</div>
          <div><strong>Location:</strong> {this.props.locations.find(location => location.id == this.state.postToDelete.locationId).name}</div>
          <div><strong>Point Value:</strong> {this.state.postToDelete.pointValue}</div>
          <div><strong>Date Opened:</strong> {this.state.postToDelete.dateOpened.format("l")}</div>
          <div><strong>Offer Expires Date:</strong> {this.state.postToDelete.dateClosed.format("l")}</div>
          <div className="deleteConfirm">
            <Button className="deleteFinal" bsStyle="danger" onClick={()=>this.handleDeletingPost()}>Delete</Button>
            <Button onClick={()=>this.handleDeleteStateChange()}>Cancel</Button>
          </div>
        </div>
      )
    } else {
      return(
        this.renderPostsTable()
      )
    }
  }
  //Choose which table to render
  renderPostsTable(props) {
    if(this.props.posts){
    return (
      <div>
        <h3>Posts</h3>
        {this.renderFilterButtons()}
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Location</th>
              <th>Point Value</th>
              <th>Date Opened</th>
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
                <td>{post.dateOpened.format("l")}</td>
                <td>{post.dateClosed.format("l")}</td>
                <td>
                  <Button onClick={()=>this.handleSettingPostToEdit(post.id)} className="editButton" bsStyle="warning">Edit</Button>
                  <Button bsStyle="danger" onClick={()=>this.handleSettingPostToDelete(post.id)}>Delete</Button>
                </td>
              </tr>)}
            </tbody>
          </table>
        </div>
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
        {this.handleVisibleContent()}
        <style>{`
          .newPostButton {
            float:right;
            margin-right: 40px;
          }
          .editButton {
            margin-right: 20px;
          }
          .deleteConfirm {
            margin-top: 20px;
          }
          .deleteFinal {
            margin-right: 20px;
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
  createPost: PropTypes.func,
  editPost: PropTypes.func,
  deletePost: PropTypes.func
};

export default ManagePosts;

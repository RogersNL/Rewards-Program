import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import PropTypes from 'prop-types';

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _title: '',
      _description: '',
      _locationId: 'All Locations',
      _pointValue: '',
      _dateClosed: moment()
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handlePointValueChange = this.handlePointValueChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleEditPostSubmit = this.handleEditPostSubmit.bind(this);
    this.handleAddingPostToState = this.handleAddingPostToState.bind(this);
  }
  //Populate the form with post data
  componentDidMount(){
    this.handleAddingPostToState();
  }
  componentWillReceieveProps(){
    this.handleAddingPostToState();
  }
  handleAddingPostToState(){
    if(this.props.postToEdit){
      this.setState({
        _title: this.props.postToEdit.name,
        _description: this.props.postToEdit.description,
        _locationId: this.props.postToEdit.locationId,
        _pointValue: this.props.postToEdit.pointValue,
        _dateClosed: this.props.dateClosed
      })
    }
  }
  handleTitleChange(event) {
    this.setState({
      _title: event.target.value
    });
  }
  handleDescriptionChange(event) {
    this.setState({
      _description: event.target.value
    });
  }
  handleLocationChange(event) {
    this.setState({
      _locationId: event.target.value
    });
  }
  handlePointValueChange(event) {
    this.setState({
      _pointValue: event.target.value
    });
  }
  handleDateChange(date) {
    this.setState({
      _dateClosed: date
    });
  }

  handleEditPostSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    this.props.editPost(this.state._title, this.state._description, this.state._pointValue, this.state._dateClosed, this.state._locationId, this.props.postToEdit.id);
    this.setState({
      _title: '',
      _description: '',
      _locationId: '',
      _pointValue: '',
      _dateClosed: moment()
    })

  }
  addPost(title, description, locationId, pointValue, dateClosed){
    const url = `https://localhost:5001/api/`;
    const data = {
      title,
      description,
      locationId,
      pointValue,
      dateClosed
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => console.log('Success;', JSON.stringify(response)))
    .catch(error => console.error('Error', error));
  }
  handleRenderPostForm(){
    if(this.props.postToEdit){
      return(
        <form onSubmit={this.handleEditPostSubmit}>
          <FormGroup>
            <ControlLabel>Title of Event or Opportunity</ControlLabel>
            <FormControl value={this.state._title} onChange={this.handleTitleChange} type="text" placeholder="Event or Opportunity" />
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Description of Event or Opportunity</ControlLabel>
            <FormControl value={this.state._description} onChange={this.handleDescriptionChange} componentClass="textarea" placeholder="Description" />
          </FormGroup>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Relevant Locations</ControlLabel>
            <FormControl value={this.state._locationId} onChange={this.handleLocationChange} componentClass="select" placeholder="select">
              <option value="All Locations">All Locations</option>
              <option value="Bothell">Bothell</option>
              <option value="Virginia">Virginia</option>
              <option value="Atlanta">Atlanta</option>
              <option value="Houston">Houston</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Chennai">Chennai</option>
              <option value="Pune">Pune</option>
              <option value="Trichy">Trichy</option>
              <option value="Malaysia">Malaysia</option>
              <option value="U.A.E">U.A.E</option>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Point Value of Event or Opportunity</ControlLabel>
            <FormControl value={this.state._pointValue} onChange={this.handlePointValueChange} type="text" placeholder="Point Value"></FormControl>
          </FormGroup>
          <ControlLabel>Offer Expires Date</ControlLabel>
          <FormGroup>
            <DatePicker
              placeholderText='MM/DD/YYYY'
              classTitle='form-control'
              selected={this.state._dateClosed}
              onChange={this.handleDateChange}/>
          </FormGroup>
          <Button type="submit" bsStyle="success">Add Post</Button>
        </form>
      )
    } else {
      return(
        <div>Loading...</div>
      )
    }
  }
  render(){
    return (
      <div>
        <h1>Edit Post</h1>
        {this.handleRenderPostForm()}
        <style>{`
        `}</style>
      </div>
    );
  }
}
EditPost.propTypes = {
  postToEdit: PropTypes.object,
  editPost: PropTypes.func
}
export default EditPost;

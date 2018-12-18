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
        _title: this.props.postToEdit.title,
        _description: this.props.postToEdit.description,
        _locationId: this.props.postToEdit.locationId,
        _pointValue: this.props.postToEdit.pointValue,
        _dateClosed: moment(this.props.dateClosed)
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
    this.props.editPost(this.state._title, this.state._description, this.state._pointValue, this.state._dateClosed.toString(), this.state._locationId, this.props.postToEdit.id);
    this.setState({
      _title: '',
      _description: '',
      _locationId: '',
      _pointValue: '',
      _dateClosed: moment()
    })
    this.props.hideEdit();
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
              {this.props.locations.map(location =>
                <option key={location.id} value={location.id} >{location.name}</option>
              )}
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
              className='form-control'
              selected={this.state._dateClosed}
              onChange={this.handleDateChange}/>
          </FormGroup>
          <Button type="submit" bsStyle="warning">Edit Post</Button>
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
        <Button className="closeEdit" onClick={()=>this.props.hideEdit()} bsStyle="danger">X</Button>
        <h3>Edit Post</h3>
        {this.handleRenderPostForm()}
        <style>{`
          .closeEdit {
            float: right;
          }
        `}</style>
      </div>
    );
  }
}
EditPost.propTypes = {
  postToEdit: PropTypes.object,
  editPost: PropTypes.func,
  hideEdit: PropTypes.func,
  locations: PropTypes.array
}
export default EditPost;

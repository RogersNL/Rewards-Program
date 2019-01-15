import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import PropTypes from 'prop-types';

class NewPostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _title: '',
      _description: '',
      _pointValue: '',
      _dateClosed: moment(),
      _locationId: '1'
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handlePointValueChange = this.handlePointValueChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleNewPostFormSubmit = this.handleNewPostFormSubmit.bind(this);
  }

  handleNameChange(event) {
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

  handleNewPostFormSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    this.props.createPost(this.state._title, this.state._description, parseInt(this.state._locationId), this.state._pointValue, moment().toString(), this.state._dateClosed.endOf('day').toString());
    this.setState({
      _title: '',
      _description: '',
      _locationId: '',
      _pointValue: '',
      _dateClosed: moment()
    })

  }

  handleRenderPostForm(){
    return(
      <form onSubmit={this.handleNewPostFormSubmit}>
        <FormGroup>
          <ControlLabel>Name of Event or Opportunity</ControlLabel>
          <FormControl value={this.state._title} onChange={this.handleNameChange} type="text" placeholder="Event or Opportunity"></FormControl>
        </FormGroup>
        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Description of Event or Opportunity</ControlLabel>
          <FormControl value={this.state._description} onChange={this.handleDescriptionChange} componentClass="textarea" placeholder="Description" />
        </FormGroup>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Relevant Locations</ControlLabel>
          <FormControl value={this.state._locationId} onChange={this.handleLocationChange} componentClass="select" placeholder="select">
            {this.props.locations.map(location =>
              <option key={location.id} value={location.id} >{location.name}</option>
            )}
          </FormControl>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Point Value of Event or Opportunity</ControlLabel>
          <FormControl value={this.state._pointValue} onChange={this.handlePointValueChange} type="number" placeholder="Point Value"></FormControl>
        </FormGroup>
        <ControlLabel>Offer Expires Date</ControlLabel>
        <FormGroup>
          <DatePicker
            placeholderText='MM/DD/YYYY'
            className='form-control'
            selected={this.state._dateClosed}
            onChange={this.handleDateChange}/>
        </FormGroup>
        <Button type="submit" bsStyle="success">Add Post</Button>
      </form>
    )
  }
  render(){
    return (
      <div>
        <h3>New Post</h3>
        {this.handleRenderPostForm()}
        <style>{`
        `}</style>
      </div>
    );
  }
}
NewPostForm.propTypes = {
  createPost: PropTypes.func,
  locations: PropTypes.array
}
export default NewPostForm;

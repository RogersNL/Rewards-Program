import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class NewPostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _name: '',
      _description: '',
      _location: 'All Locations',
      _pointValue: '',
      _dateClosed: moment()
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
      _name: event.target.value
    });
  }
  handleDescriptionChange(event) {
    this.setState({
      _description: event.target.value
    });
  }
  handleLocationChange(event) {
    this.setState({
      _location: event.target.value
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
    // this.addPost(this.state._name, this.state._description, this.state._location, this.state._pointValue, this.state._dateClosed);
    this.setState({
      _name: '',
      _description: '',
      _location: '',
      _pointValue: '',
      _dateClosed: moment()
    })

  }
  addPost(name, description, location, pointValue, dateClosed){
    const url = `https://localhost:5001/api/`;
    const data = {
      name,
      description,
      location,
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
    return(
      <form onSubmit={this.handleNewPostFormSubmit}>
        <FormGroup>
          <ControlLabel>Name of Event or Opportunity</ControlLabel>
          <FormControl value={this.state._name} onChange={this.handleNameChange} type="text" placeholder="Event or Opportunity"></FormControl>
        </FormGroup>
        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Description of Event or Opportunity</ControlLabel>
          <FormControl value={this.state._description} onChange={this.handleDescriptionChange} componentClass="textarea" placeholder="Description" />
        </FormGroup>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Relevant Locations</ControlLabel>
          <FormControl value={this.state._location} onChange={this.handleLocationChange} componentClass="select" placeholder="select">
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
        <h1>New Post</h1>
        {this.handleRenderPostForm()}
        <style>{`
        `}</style>
      </div>
    );
  }
}

export default NewPostForm;

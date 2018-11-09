import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

class NewPostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render(){
    return (
      <div>
        <h1>New Post</h1>
        <form>
          <FormGroup>
            <ControlLabel>Name of Event or Opportunity</ControlLabel>
            <FormControl type="text" placeholder="Event or Opportunity"></FormControl>
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Description of Event or Opportunity</ControlLabel>
            <FormControl componentClass="textarea" placeholder="Description" />
          </FormGroup>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Relevant Locations</ControlLabel>
            <FormControl componentClass="select" placeholder="select">
              <option value="1">All Locations</option>
              <option value="2">Bothell</option>
              <option value="3">Virginia</option>
              <option value="4">Atlanta</option>
              <option value="5">Houston</option>
              <option value="6">Los Angeles</option>
              <option value="7">Chennai</option>
              <option value="8">Pune</option>
              <option value="9">Trichy</option>
              <option value="10">Malaysia</option>
              <option value="11">U.A.E</option>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Point Value of Event or Opportunity</ControlLabel>
            <FormControl type="text" placeholder="Point Value"></FormControl>
          </FormGroup>
          <ControlLabel>Offer Expires Date</ControlLabel>
          <FormGroup>
            <DatePicker
              placeholderText='MM/DD/YYYY'
              className='form-control'
              selected={this.state.startDate}
              onChange={this.handleChange}/>
          </FormGroup>
          <Button bsStyle="success">Add Post</Button>
        </form>
        <style jsx>{`
            DatePicker {

            }
        `}</style>
      </div>
    );
  }
}

export default NewPostForm;

import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

class NewGiftForm extends Component {
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
        <h1>New Gift</h1>
        <form>
          <FormGroup>
            <ControlLabel>Name of Gift/Prize</ControlLabel>
            <FormControl type="text" placeholder="Gift/Prize"></FormControl>
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Description of Gift/Prize</ControlLabel>
            <FormControl componentClass="textarea" placeholder="Description" />
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
          <Button bsStyle="success">Add Gift</Button>
        </form>
        <style jsx>{`
            DatePicker {
              margin-bottom: 30px;
            }
        `}</style>
      </div>
    );
  }
}

export default NewGiftForm;

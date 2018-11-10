import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

class NewGiftForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _name: '',
      _description: '',
      _pointValue: '',
      _dateClosed: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handlePointValueChange = this.handlePointValueChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleNewGiftFormSubmit = this.handleNewGiftFormSubmit.bind(this);
  }

  handleNameChange(event){
    this.setState({
      _name: event.target.value
    })
  }
  handleDescriptionChange(event){
    this.setState({
      _description: event.target.value
    })
  }
  handlePointValueChange(event){
    this.setState({
      _pointValue: event.target.value
    })
  }
  handleDateChange(date){
    this.setState({
      _dateClosed: date
    })
  }

  handleNewGiftFormSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    this.setState({
      _name: '',
      _description: '',
      _pointValue: '',
      _dateClosed: ''
    })
  }
  render(){
    return (
      <div>
        <h1>New Gift</h1>
        <form onSubmit={this.handleNewGiftFormSubmit}>
          <FormGroup>
            <ControlLabel>Name of Gift/Prize</ControlLabel>
            <FormControl value={this.state._name} onChange={this.handleNameChange} type="text" placeholder="Gift/Prize"></FormControl>
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Description of Gift/Prize</ControlLabel>
            <FormControl value={this.state._description} onChange={this.handleDescriptionChange} componentClass="textarea" placeholder="Description" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Point Value of Gift</ControlLabel>
            <FormControl value={this.state._pointValue} onChange={this.handlePointValueChange} type="text" placeholder="Point Value"></FormControl>
          </FormGroup>
          <ControlLabel>Offer Expires Date</ControlLabel>
          <FormGroup>
            <DatePicker
              value={this.state._dateClosed}
              placeholderText='MM/DD/YYYY'
              className='form-control'
              selected={this.state._dateClosed}
              onChange={this.handleDateChange} />
          </FormGroup>
          <Button bsStyle="success" type="submit">Add Gift</Button>
        </form>
        <style jsx>{`
            DatePicker {

            }
        `}</style>
      </div>
    );
  }
}

export default NewGiftForm;

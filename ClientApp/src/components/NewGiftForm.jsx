import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import PropTypes from 'prop-types';

class NewGiftForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _name: '',
      _description: '',
      _pointValue: '',
      _dateClosed: moment()
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handlePointValueChange = this.handlePointValueChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleNewGiftFormSubmit = this.handleNewGiftFormSubmit.bind(this);
    this.handleRenderGiftForm = this.handleRenderGiftForm.bind(this);
  }
  //Set value in the form to the state
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
    this.props.createGift(this.state._name, this.state._description, this.state._pointValue);
    this.setState({
      _name: '',
      _description: '',
      _pointValue: '',
      _dateClosed: moment()
    })
  }
  //Render Gift Form
  handleRenderGiftForm(){
    return(
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
            placeholderText='MM/DD/YYYY'
            className='form-control'
            selected={this.state._dateClosed}
            onChange={this.handleDateChange} />
        </FormGroup>
        <Button bsStyle="success" type="submit">Add Gift</Button>
      </form>
    )
  }
  render(){
    return (
      <div>
        <h1>New Gift</h1>
        {this.handleRenderGiftForm()}
        <style>{`

        `}</style>
      </div>
    );
  }
}
NewGiftForm.propTypes = {
  createGift: PropTypes.func
}
export default NewGiftForm;

import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import PropTypes from 'prop-types';

class EditGift extends Component {
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
    this.handleEditGiftSubmit = this.handleEditGiftSubmit.bind(this);
    this.handleRenderGiftForm = this.handleRenderGiftForm.bind(this);
    this.handleAddingGiftToState = this.handleAddingGiftToState.bind(this);
  }
  //Populate the form with post data
  componentDidMount(){
    this.handleAddingGiftToState();
  }
  componentWillReceiveProps(){
    this.handleAddingGiftToState();
  }
  handleAddingGiftToState(){
    if(this.props.giftToEdit){
      this.setState({
        _name: this.props.giftToEdit.name,
        _description: this.props.giftToEdit.description,
        _pointValue: this.props.giftToEdit.pointValue,
        _dateClosed: this.props.giftToEdit.dateClosed
      })
    }
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

  handleEditGiftSubmit(event) {
    event.preventDefault();
    this.props.editGift(this.state._name, this.state._description, this.state._pointValue, this.props.giftToEdit.id)
    this.setState({
      _name: '',
      _description: '',
      _pointValue: ''
    })
  }
  //Render Gift Form
  handleRenderGiftForm(){
    return(
      <form onSubmit={this.handleEditGiftSubmit}>
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
        <h1>Edit Gift</h1>
        {this.handleRenderGiftForm()}
        <style>{`

        `}</style>
      </div>
    );
  }
}
EditGift.propTypes = {
  giftToEdit: PropTypes.object,
  editGift: PropTypes.func
}
export default EditGift;

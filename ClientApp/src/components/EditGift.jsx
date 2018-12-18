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
      _pointValue: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handlePointValueChange = this.handlePointValueChange.bind(this);
    this.handleEditGiftSubmit = this.handleEditGiftSubmit.bind(this);
    this.handleRenderGiftForm = this.handleRenderGiftForm.bind(this);
    this.handleAddingGiftToState = this.handleAddingGiftToState.bind(this);
    this.handleClosingEditForm = this.handleClosingEditForm.bind(this);
  }
  //Populate the form with gift data
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
        _pointValue: this.props.giftToEdit.cost,
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
  handleClosingEditForm(){
    this.props.hideEdit()
  }
  handleEditGiftSubmit(event) {
    event.preventDefault();
    this.props.editGift(this.state._name, this.state._description, this.state._pointValue, this.props.giftToEdit.id)
    this.setState({
      _name: '',
      _description: '',
      _pointValue: ''
    })
    this.props.hideEdit();
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
          <FormControl value={this.state._pointValue} onChange={this.handlePointValueChange} type="number" placeholder="Point Value"></FormControl>
        </FormGroup>
        <Button bsStyle="warning" type="submit">Edit Gift</Button>
      </form>
    )
  }
  render(){
    return (
      <div>
        <Button bsStyle="danger" className="closeButton" onClick={() => this.handleClosingEditForm()}>X</Button>
        <h3>Edit Gift</h3>
        {this.handleRenderGiftForm()}
        <style>{`
          .closeButton {
            float: right;
          }
        `}</style>
      </div>
    );
  }
}
EditGift.propTypes = {
  giftToEdit: PropTypes.object,
  editGift: PropTypes.func,
  hideEdit: PropTypes.func
}
export default EditGift;

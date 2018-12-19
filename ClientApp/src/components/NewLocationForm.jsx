import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

class NewLocationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _name: '',
      _description: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleNewLocationFormSubmit = this.handleNewLocationFormSubmit.bind(this);
    this.handleRenderLocationForm = this.handleRenderLocationForm.bind(this);
  }
  //Set value in the form to the state
  handleNameChange(event){
    this.setState({
      _name: event.target.value
    })
  }
  handleAddressChange(event){
    this.setState({
      _description: event.target.value
    })
  }

  handleNewLocationFormSubmit(event) {
    event.preventDefault();
    this.props.createLocation(this.state._name, this.state._description);
    this.setState({
      _name: '',
      _description: ''
    })
  }
  //Render Location Form
  handleRenderLocationForm(){
    return(
      <form onSubmit={this.handleNewLocationFormSubmit}>
        <FormGroup>
          <ControlLabel>Name of Location</ControlLabel>
          <FormControl value={this.state._name} onChange={this.handleNameChange} type="text" placeholder="Location/Prize"></FormControl>
        </FormGroup>
        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Address of Location</ControlLabel>
          <FormControl value={this.state._description} onChange={this.handleAddressChange} componentClass="textarea" placeholder="Address" />
        </FormGroup>
        <Button bsStyle="success" type="submit">Add Location</Button>
      </form>
    )
  }
  render(){
    return (
      <div>
        <h3>New Location</h3>
        {this.handleRenderLocationForm()}
        <style>{`

        `}</style>
      </div>
    );
  }
}
NewLocationForm.propTypes = {
  createLocation: PropTypes.func
}
export default NewLocationForm;

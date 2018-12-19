import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

class EditLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _name: '',
      _address: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleEditLocationSubmit = this.handleEditLocationSubmit.bind(this);
    this.handleRenderLocationForm = this.handleRenderLocationForm.bind(this);
    this.handleAddingLocationToState = this.handleAddingLocationToState.bind(this);
    this.handleClosingEditForm = this.handleClosingEditForm.bind(this);
  }
  //Populate the form with location data
  componentDidMount(){
    this.handleAddingLocationToState();
  }
  componentWillReceiveProps(){
    this.handleAddingLocationToState();
  }
  handleAddingLocationToState(){
    if(this.props.locationToEdit){
      this.setState({
        _name: this.props.locationToEdit.name,
        _address: this.props.locationToEdit.address
      })
    }
  }
  //Set value in the form to the state
  handleNameChange(event){
    this.setState({
      _name: event.target.value
    })
  }
  handleAddressChange(event){
    this.setState({
      _address: event.target.value
    })
  }
  handleClosingEditForm(){
    this.props.hideEdit()
  }
  handleEditLocationSubmit(event) {
    event.preventDefault();
    this.props.editLocation(this.state._name, this.state._address, this.props.locationToEdit.id)
    this.setState({
      _name: '',
      _address: ''
    })
    this.props.hideEdit();
  }
  //Render Location Form
  handleRenderLocationForm(){
    return(
      <form onSubmit={this.handleEditLocationSubmit}>
        <FormGroup>
          <ControlLabel>Name of Location/Prize</ControlLabel>
          <FormControl value={this.state._name} onChange={this.handleNameChange} type="text" placeholder="Location/Prize"></FormControl>
        </FormGroup>
        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Address of Location/Prize</ControlLabel>
          <FormControl value={this.state._address} onChange={this.handleAddressChange} componentClass="textarea" placeholder="Address" />
        </FormGroup>
        <Button bsStyle="warning" type="submit">Edit Location</Button>
      </form>
    )
  }
  render(){
    return (
      <div>
        <Button bsStyle="danger" className="closeButton" onClick={() => this.handleClosingEditForm()}>X</Button>
        <h3>Edit Location</h3>
        {this.handleRenderLocationForm()}
        <style>{`
          .closeButton {
            float: right;
          }
        `}</style>
      </div>
    );
  }
}
EditLocation.propTypes = {
  locationToEdit: PropTypes.object,
  editLocation: PropTypes.func,
  hideEdit: PropTypes.func
}
export default EditLocation;

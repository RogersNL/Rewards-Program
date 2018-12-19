import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import NewLocationForm from './NewLocationForm';
import EditLocation from './EditLocation';


class ManageLocations extends Component {
  constructor(props){
    super(props);
    this.state = {
      locations: [],
      locationToEdit: null,
      locationToDelete: null
    }
    this.handleSettingLocationsToState = this.handleSettingLocationsToState.bind(this);
    this.handleSettingLocationToEdit = this.handleSettingLocationToEdit.bind(this);
    this.handleEditStateChange = this.handleEditStateChange.bind(this);
    this.handleRenderLocationsTable = this.handleRenderLocationsTable.bind(this);
    this.handleVisibleContent = this.handleVisibleContent.bind(this);
    this.handleSettingLocationToDelete = this.handleSettingLocationToDelete.bind(this);
    this.handleDeleteStateChange = this.handleDeleteStateChange.bind(this);
    this.handleDeletingLocation = this.handleDeletingLocation.bind(this);
  }
  componentDidMount(){
    this.handleSettingLocationsToState();
  }
  componentWillReceiveProps(){
    this.handleSettingLocationsToState();
  }
  componentDidUpdate(prevProps){
    if (prevProps.locations !== this.props.locations) {
      this.handleSettingLocationsToState()
    }
  }
  handleSettingLocationsToState(){
    const locationList = this.props.locations.locations
    this.setState({
      locations: locationList
    })
  }
  handleSettingLocationToEdit(id){
    const locationToEdit = this.state.locations.find(location => location.id == id)
    this.setState({
      locationToEdit: locationToEdit
    })
  }
  handleEditStateChange(){
    this.setState({
      locationToEdit: null
    })
  }
  handleDeleteStateChange(){
    this.setState({
      locationToDelete: null
    })
  }
  handleSettingLocationToDelete(id){
    const locationToDelete = this.state.locations.find(location => location.id == id)
    this.setState({
      locationToDelete: locationToDelete
    })
  }
  handleDeletingLocation(){
    this.props.deleteLocation(this.state.locationToDelete.id);
    this.setState({
      locationToDelete: null
    })
  }
  handleRenderLocationsTable(){
    if(this.props.locations){
      return(
        <div>
          <h3>Locations</h3>
          <table className='table'>
            <thead>
              <tr>
                <th>Location</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {this.state.locations.map(location =>
                <tr key={location.id}>
                  <td>{location.name}</td>
                  <td>{location.address}</td>
                  <td>
                    <Button bsStyle="warning" className="editButton" onClick={()=>this.handleSettingLocationToEdit(location.id)}>Edit</Button>
                    <Button bsStyle="danger" onClick={()=>this.handleSettingLocationToDelete(location.id)}>Delete</Button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      )
    } else {
      return(
        <div>Loading...</div>
      )
    }
  }
  handleVisibleContent(){
    if(this.state.locationToEdit){
      return(
        <EditLocation editLocation={this.props.editLocation} locationToEdit={this.state.locationToEdit} hideEdit={this.handleEditStateChange} />
      )
    } else if (this.state.locationToDelete) {
      return(
        <div>
          <h3>Delete this Location?</h3>
          <div><strong>Name:</strong> {this.state.locationToDelete.name}</div>
          <div><strong>Address:</strong> {this.state.locationToDelete.address}</div>
          <div className="deleteConfirm">
            <Button className="deleteFinal" bsStyle="danger" onClick={() => this.handleDeletingLocation()}>Delete</Button>
            <Button onClick={()=>this.handleDeleteStateChange()} >Cancel</Button>
          </div>
        </div>
      )
    } else {
      return(
        this.handleRenderLocationsTable()
      )
    }
  }
  render(){
    return(
      <div>
        <h1>Manage Locations</h1>
        <p>Add/Update Locations</p>
        <hr />
        <NewLocationForm createLocation={this.props.createLocation} />
        <hr />
        {this.handleVisibleContent()}
        <style>{`
          .editButton {
            margin-right: 20px;
          }
          .deleteConfirm {
            margin-top: 20px;
          }
          .deleteFinal {
            margin-right: 20px;
          }
        `}</style>
      </div>
    )
  }
}

ManageLocations.propTypes = {
  locations: PropTypes.object,
  createLocation: PropTypes.func,
  editLocation: PropTypes.func,
  deleteLocation: PropTypes.func
}
export default ManageLocations;

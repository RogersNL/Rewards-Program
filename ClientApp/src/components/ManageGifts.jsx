import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NewGiftForm from './NewGiftForm';
import EditGift from './EditGift';

class ManageGifts extends Component {
  constructor(props){
    super(props);
    this.state = {
      gifts: [],
      giftToEdit: null,
      giftToDelete: null
    }
    this.handleSettingGiftToEdit = this.handleSettingGiftToEdit.bind(this);
    this.handleSettingGiftToDelete = this.handleSettingGiftToDelete.bind(this);
    this.renderGiftsTable = this.renderGiftsTable.bind(this);
    this.handleSettingGiftsToState = this.handleSettingGiftsToState.bind(this);
    this.handleVisibleContent = this.handleVisibleContent.bind(this);
    this.handleEditStateChange = this.handleEditStateChange.bind(this);
    this.handleDeleteStateChange = this.handleDeleteStateChange.bind(this);
    this.handleDeletingGift = this.handleDeletingGift.bind(this);
  }

  componentDidMount(){
    this.handleSettingGiftsToState();
  }
  componentWillReceiveProps(){
    this.handleSettingGiftsToState();
  }
  componentDidUpdate(prevProps){
    if (prevProps.gifts !== this.props.gifts) {
      this.handleSettingGiftsToState()
    }
  }

  handleSettingGiftToEdit(id){
    const giftToEdit = this.state.gifts.find(gift => gift.id == id)
    this.setState({
      giftToEdit: giftToEdit
    })
  }

  handleSettingGiftToDelete(id){
    const giftToDelete = this.state.gifts.find(gift => gift.id == id)
    this.setState({
      giftToDelete: giftToDelete
    })
  }

  handleDeletingGift(){
    this.props.deleteGift(this.state.giftToDelete.id);
    this.setState({
      giftToDelete: null
    })
  }

  handleSettingGiftsToState(){
    const giftList = this.props.gifts.gifts
    this.setState({
      gifts: giftList
    })
  }
  handleVisibleContent(){
    if(this.state.giftToEdit){
      return (
        <EditGift editGift={this.props.editGift} giftToEdit={this.state.giftToEdit} hideEdit={this.handleEditStateChange}/>
      )
    } else if (this.state.giftToDelete) {
      return (
        <div>
          <h3>Delete this Gift?</h3>
          <div><strong>Name:</strong> {this.state.giftToDelete.name}</div>
          <div><strong>Description:</strong> {this.state.giftToDelete.description}</div>
          <div><strong>Point Value:</strong> {this.state.giftToDelete.cost}</div>
          <div className="deleteConfirm">
            <Button className="deleteFinal" bsStyle="danger" onClick={()=>this.handleDeletingGift()}>Delete</Button>
            <Button onClick={()=>this.handleDeleteStateChange()}>Cancel</Button>
          </div>
        </div>
      )
    } else {
      return(
        this.renderGiftsTable()
      )
    }
  }
  handleEditStateChange(){
    this.setState({
      giftToEdit: null
    })
  }
  handleDeleteStateChange(){
    this.setState({
      giftToDelete: null
    })
  }
  renderGiftsTable() {
    if(this.props.gifts){
      return (
        <div>
          <h3>Gifts</h3>
          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Point Value</th>
              </tr>
            </thead>
            <tbody>
              {this.state.gifts.map(gift =>
                <tr key={gift.id}>
                  <td>{gift.name}</td>
                  <td>{gift.description}</td>
                  <td>{gift.cost}</td>
                  <td>
                    <Button bsStyle="warning" className="editButton" onClick={()=>this.handleSettingGiftToEdit(gift.id)}>Edit</Button>
                    <Button bsStyle="danger" onClick={() => this.handleSettingGiftToDelete(gift.id)}>Delete</Button>
                  </td>
                </tr>)}
              </tbody>
            </table>
          </div>
        );
      } else {
        return (
          <div>Loading...</div>
        )
      }
    }

  render(){
    return (
      <div>
        <h1>Manage Gifts</h1>
        <p>Add/Modify Gifts</p>
        <hr />
        <NewGiftForm createGift={this.props.createGift}/>
        <hr />
        {this.handleVisibleContent()}
        <style>{`
          .newGiftButton {
            float:right;
            margin-right: 40px;
          }
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

ManageGifts.propTypes = {
  gifts: PropTypes.object,
  setGift: PropTypes.func,
  createGift: PropTypes.func,
  editGift: PropTypes.func,
  deleteGift: PropTypes.func
};

export default ManageGifts;

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ManageGifts(props) {
  function renderGiftsTable(props) {
    if(props.giftList){
      return (
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Point Value</th>
            </tr>
          </thead>
          <tbody>
            {props.giftList.map(gift =>
              <tr key={gift.id}>
                <td>{gift.name}</td>
                <td>{gift.description}</td>
                <td>{gift.pointValue}</td>
              </tr>)}
            </tbody>
          </table>
        );
      } else {
      return (
        <div>Loading...</div>
      )
      }
    }
  return (
    <div>
      <Link to='/new-gift' ><Button className="newGiftButton" bsStyle="primary">Add New Gift</Button></Link>
      <h1>Manage Gifts</h1>
      <p>Add/Modify Gifts</p>
      {renderGiftsTable(props)}
      <style>{`
        .newGiftButton {
          float:right;
          margin-right: 40px;
        }
      `}</style>
    </div>
  )
}

ManageGifts.propTypes = {
  giftList: PropTypes.array
};

export default ManageGifts;

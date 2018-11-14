import React from 'react';
import PropTypes from 'prop-types';

function ClaimGifts(props) {
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
      <h1>Claim Gifts</h1>
      <p>Email ____ to claim your gift!</p>
      {renderGiftsTable(props)}
    </div>
  )
}

ClaimGifts.propTypes = {
  giftList: PropTypes.array
};

export default ClaimGifts;

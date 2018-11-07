import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/Gifts';

class ClaimGifts extends Component {
  componentWillMount() {
    this.props.requestGifts();
  }

  render() {
    return (
      <div>
        <h1>Claim Gifts</h1>
        <p>Email ____ to claim your gift!</p>
        {renderGiftsTable(this.props)}
      </div>
    )
  }
}

function renderGiftsTable(props) {
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
        {props.gifts.map(gift =>
        <tr key={gift.id}>
          <td>{gift.name}</td>
          <td>{gift.description}</td>
          <td>{gift.pointValue}</td>
        </tr>)}
      </tbody>
    </table>
  );
}
export default connect(
  state => state.gifts,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(ClaimGifts);

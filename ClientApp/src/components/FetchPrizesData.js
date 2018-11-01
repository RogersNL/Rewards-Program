import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/Prizes';

class FetchPrizesData extends Component {
  componentWillMount() {
    this.props.requestPrizes();
  }

  render() {
    return (
      <div>
        <h1>Claim Gifts</h1>
        <p>Spend your points on some great prizes.</p>
        {renderPrizesTable(this.props)}
      </div>
    )
  }
}

function renderPrizesTable(props) {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Point Value</th>
          <th>Offer Expires</th>
        </tr>
      </thead>
      <tbody>
        {props.prizes.map(prize =>
        <tr key={prize.id}>
          <td>{prize.name}</td>
          <td>{prize.description}</td>
          <td>{prize.pointValue}</td>
          <td>{prize.dateClosed}</td>
        </tr>)}
      </tbody>
    </table>
  );
}
export default connect(
  state => state.prizes,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(FetchPrizesData);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pager } from 'react-bootstrap';

class Leaderboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      tableIndex: 0,
      shownUsers: []
    };
    this.handleRenderLeaderboardTable = this.handleRenderLeaderboardTable.bind(this);
    this.handleSettingShownUsers = this.handleSettingShownUsers.bind(this);
    this.handleRenderPagination = this.handleRenderPagination.bind(this);
    this.handleNextPagination = this.handleNextPagination.bind(this);
    this.handlePreviousPagination = this.handlePreviousPagination.bind(this);
  }
  componentDidMount(){
    this.handleSettingShownUsers(this.state.tableIndex);
  }
  componentWillReceiveProps(){
    this.handleSettingShownUsers(this.state.tableIndex);
  }
  handleSettingShownUsers(index){
    if(this.props.userList){
      const users = this.props.userList.slice(index*10, (index + 1)*10);
      this.setState({
        shownUsers: users
      })
    }
  }
  handleNextPagination(){
    this.handleSettingShownUsers(this.state.tableIndex + 1);
    this.setState({
      tableIndex: this.state.tableIndex + 1
    })
  }
  handlePreviousPagination(){
    this.handleSettingShownUsers(this.state.tableIndex - 1);
    this.setState({
      tableIndex: this.state.tableIndex - 1
    })
  }
  handleRenderPagination(){
    if(this.state.tableIndex === 0){
      return(
        <Pager>
          <Pager.Item next onClick={this.handleNextPagination}>
            Next
          </Pager.Item>
        </Pager>
      )
    } else if (this.state.tableIndex >= this.props.userList.length/10 - 1) {
      return(
        <Pager>
          <Pager.Item previous onClick={this.handlePreviousPagination}>
            Previous
          </Pager.Item>
        </Pager>
      )
    } else {
      return (
        <Pager>
          <Pager.Item previous onClick={this.handlePreviousPagination}>
            Previous
          </Pager.Item>
          <Pager.Item next onClick={this.handleNextPagination}>
            Next
          </Pager.Item>
        </Pager>
      )
    }
  }
  handleRenderLeaderboardTable(props) {
    if(props.userList){
      return (
        <table className='table'>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Location</th>
              <th>Lifetime Points</th>
            </tr>
          </thead>
          <tbody>
            {this.state.shownUsers.map((user, index) =>
              <tr key={user.id}>
                <td>{this.state.tableIndex*10 + index + 1}</td>
                <td>{user.name}</td>
                <td>{user.location}</td>
                <td>{user.lifetimePoints}</td>
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
    render(){

    return (
      <div>
        <h1>Leaderboard</h1>
        <p>Top earners in iLink.</p>
        {this.handleRenderLeaderboardTable(this.props)}
        {this.handleRenderPagination()}
      </div>
    )
  }
}

Leaderboard.propTypes = {
  userList: PropTypes.array
};

export default Leaderboard;

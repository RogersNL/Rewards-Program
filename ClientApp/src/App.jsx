import React, {Component} from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getToken } from './adalConfig';
//Components
import Admin from './components/Admin';
import Analytics from './components/Analytics';
import ClaimGifts from './components/ClaimGifts';
import Earn from './components/Earn';
import Error404 from './components/Error404';
import FetchData from './components/FetchData';
import Home from './components/Home';
import Layout from './components/Layout';
import Leaderboard from './components/Leaderboard';
import LogIn from './components/LogIn';
import ManageGifts from './components/ManageGifts';
import ManagePosts from './components/ManagePosts';
import ManageUsers from './components/ManageUsers';
import NewGiftForm from './components/NewGiftForm';
import NewPostForm from './components/NewPostForm';
import Profile from './components/Profile';
import UserPointsForm from './components/UserPointsForm';
//Action Creators
import { giftActionCreators } from './store/Gifts';
import { postActionCreators } from './store/Posts';
import { transactionActionCreators } from './store/Transactions';
import { userActionCreators } from './store/Users';
import { weatherActionCreators} from './store/WeatherForecasts';


class App extends Component {
  componentWillMount() {
    //Load API data before component mounts
    this.props.actions.requestUsers();
    this.props.actions.requestGifts();
    this.props.actions.requestTransactions();
    this.props.actions.requestPosts();
    this.props.actions.requestWeatherForecasts(getToken())
    console.log(getToken());
  }

  render(){
    return(
      <div>
        <Layout loggedInUser={this.props.appState.users.loggedInUser}>
          <Switch>
            <Route exact path='/' render={()=><Home loggedInUser={this.props.appState.users.loggedInUser} />} />
            <Route path='/earn' render={()=><Earn posts={this.props.appState.posts} filterByLocation={this.props.actions.filterCurrentPostsByLocation} filterByDate={this.props.actions.filterCurrentPostsByDate} />} />
            <Route path='/profile' render={()=><Profile loggedInUser={this.props.appState.users.loggedInUser} transactionList={this.props.appState.transactions.userTransactions} />} />
            <Route path='/leaderboard' render={()=><Leaderboard userList={this.props.appState.users.sortedUsers} />} />
            <Route path='/rewards' render={()=><ClaimGifts giftList={this.props.appState.gifts.gifts} />} />
            <Route path='/admin' component={Admin} />
            <Route path='/manage-users' render={()=><ManageUsers userList={this.props.appState.users.users} />} />
            <Route path='/manage-posts' render={()=><ManagePosts posts={this.props.appState.posts} filterByLocation={this.props.actions.filterAllPostsByLocation} filterByDate={this.props.actions.filterAllPostsByDate} />} />
            <Route path='/manage-gifts' render={()=><ManageGifts giftList={this.props.appState.gifts.gifts} />} />
            <Route path='/new-post' component={NewPostForm} />
            <Route path='/new-gift' component={NewGiftForm} />
            <Route path='/analytics' component={Analytics} />
            <Route path='/user/:id' render={()=><UserPointsForm userList={this.props.appState.users.users} transactionList={this.props.appState.transactions.transactions} location={this.props.location.pathname} findUsersTransactions={this.props.actions.findUsersTransactions} />} />
            <Route path='/login' render={()=><LogIn logInUser={this.props.actions.setLoggedInUser} findUsersTransactions={this.props.actions.findUsersTransactions} />} />
            <Route component={Error404} />
          </Switch>
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    appState: state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Object.assign({}, userActionCreators, giftActionCreators, transactionActionCreators, postActionCreators, weatherActionCreators), dispatch)
  };
};
App.propTypes = {
  appState: PropTypes.object
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

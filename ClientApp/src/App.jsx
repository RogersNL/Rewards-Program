import React, {Component} from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getToken, adalApiFetch } from './adalConfig';
//Components
import Admin from './components/Admin';
import Analytics from './components/Analytics';
import ClaimGifts from './components/ClaimGifts';
import Earn from './components/Earn';
import EditGift from './components/EditGift';
import EditPost from './components/EditPost';
import Error404 from './components/Error404';
import Home from './components/Home';
import Layout from './components/Layout';
import Leaderboard from './components/Leaderboard';
import LogIn from './components/LogIn';
import ManageGifts from './components/ManageGifts';
import ManageLocations from './components/ManageLocations';
import ManagePosts from './components/ManagePosts';
import ManageUsers from './components/ManageUsers';
import NewGiftForm from './components/NewGiftForm';
import NewPostForm from './components/NewPostForm';
import Profile from './components/Profile';
import UserPointsForm from './components/UserPointsForm';
//Action Creators
import { giftActionCreators } from './store/Gifts';
import { locationActionCreators } from './store/Locations';
import { postActionCreators } from './store/Posts';
import { transactionActionCreators } from './store/Transactions';
import { userActionCreators } from './store/Users';


class App extends Component {

  componentWillMount() {
    //Load API data before component mounts
    this.props.actions.setLoggedInUser();
    this.props.actions.requestUsers();
    this.props.actions.findUsersTransactions();
    this.props.actions.requestGifts();
    this.props.actions.requestTransactions();
    this.props.actions.requestPosts();
    this.props.actions.requestLocations();
  }

  render(){
    if(this.props.appState.users.loggedInUser){
      return(
        <div>
          <Layout loggedInUser={this.props.appState.users.loggedInUser}>
            <Switch>
              <Route exact path='/' render={()=><Home loggedInUser={this.props.appState.users.loggedInUser} />} />
              <Route path='/earn' render={()=><Earn posts={this.props.appState.posts} locations={this.props.appState.locations.locations} />} />
              <Route path='/profile' render={()=><Profile appState={this.props} loggedInUser={this.props.appState.users.loggedInUser} transactionList={this.props.appState.transactions.transactions} />} />
              <Route path='/leaderboard' render={()=><Leaderboard userList={this.props.appState.users.sortedUsers} />} />
              <Route path='/rewards' render={()=><ClaimGifts giftList={this.props.appState.gifts.gifts} />} />
              {this.props.appState.users.loggedInUser.adminLevel > 0 ? <Route path='/admin' component={Admin} /> : null}
              {this.props.appState.users.loggedInUser.adminLevel > 0 ? <Route path='/manage-users' render={()=><ManageUsers userList={this.props.appState.users.users} />} /> : null}
              {this.props.appState.users.loggedInUser.adminLevel > 0 ? <Route path='/manage-posts' render={()=><ManagePosts posts={this.props.appState.posts} setPost={this.props.actions.setPostToEdit} locations={this.props.appState.locations.locations} editPost={this.props.actions.editPost} deletePost={this.props.actions.deletePost} createPost={this.props.actions.createNewPost} />} /> : null}
              {this.props.appState.users.loggedInUser.adminLevel > 0 ? <Route path='/manage-gifts' render={()=><ManageGifts gifts={this.props.appState.gifts} setGift={this.props.actions.setGiftToEdit} createGift={this.props.actions.createNewGift} editGift={this.props.actions.editGift} deleteGift={this.props.actions.deleteGift} />} /> : null}
              {this.props.appState.users.loggedInUser.adminLevel > 0 ? <Route path='/manage-locations' render={()=><ManageLocations locations={this.props.appState.locations} createLocation={this.props.actions.createLocation} editLocation={this.props.actions.editLocation} deleteLocation={this.props.actions.deleteLocation} />} /> : null}
              {this.props.appState.users.loggedInUser.adminLevel > 0 ? <Route path='/analytics' component={Analytics} /> : null}
              {this.props.appState.users.loggedInUser.adminLevel > 0 ? <Route path='/user/:id' render={()=><UserPointsForm userList={this.props.appState.users.users} transactionList={this.props.appState.transactions.transactions} location={this.props.location.pathname} findUsersTransactions={this.props.actions.findUsersTransactions} createTransaction={this.props.actions.createTransaction} adminUserId={this.props.appState.users.loggedInUser.employeeId} requestTransactions={this.props.actions.requestTransactions} updateUser={this.props.actions.updateUser} />} /> : null}
              <Route path='/login' render={()=><LogIn logInUser={this.props.actions.setLoggedInUser} findUsersTransactions={this.props.actions.findUsersTransactions} />} />
              <Route component={Error404} />
            </Switch>
          </Layout>
        </div>
      )
      } else {
        return (
          <div>Loading...</div>
        )
      }
  }
}
const mapStateToProps = state => {
  return {
    appState: state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Object.assign({}, userActionCreators, giftActionCreators, transactionActionCreators, postActionCreators, locationActionCreators), dispatch)
  };
};
App.propTypes = {
  appState: PropTypes.object
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

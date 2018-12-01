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


class App extends Component {

  componentWillMount() {
    //Load API data before component mounts
    this.props.actions.requestUsers();
    this.props.actions.requestGifts();
    this.props.actions.requestTransactions();
    this.props.actions.requestPosts();
  }
  componentDidMount() {
  //   adalApiFetch(fetch, 'https://graph.microsoft.com/v1.0/users', {})
  //       .then((response) => {
  //         response.json()
  //           .then((responseJson) => {
  //             console.log(JSON.stringify(responseJson, null, 2))
  //             // this.setState( { apiResponse: JSON.stringify(responseJson, null, 2) })
  //           });
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       })
    }

  render(){
    return(
      <div>
        <Layout loggedInUser={this.props.appState.users.loggedInUser}>
          <Switch>
            <Route exact path='/' render={()=><Home loggedInUser={this.props.appState.users.loggedInUser} />} />
            <Route path='/earn' render={()=><Earn posts={this.props.appState.posts} filterByLocation={this.props.actions.filterCurrentPostsByLocation} filterByDate={this.props.actions.filterCurrentPostsByDate} />} />
            <Route path='/profile' render={()=><Profile appState={this.props.appState} loggedInUser={this.props.appState.users.loggedInUser} transactionList={this.props.appState.transactions.userTransactions} />} />
            <Route path='/leaderboard' render={()=><Leaderboard userList={this.props.appState.users.sortedUsers} />} />
            <Route path='/rewards' render={()=><ClaimGifts giftList={this.props.appState.gifts.gifts} />} />
             {true ? <Route path='/admin' component={Admin} /> : null}
            <Route path='/manage-users' render={()=><ManageUsers userList={this.props.appState.users.users} />} />
            <Route path='/manage-posts' render={()=><ManagePosts posts={this.props.appState.posts} setPost={this.props.actions.setPostToEdit} filterByLocation={this.props.actions.filterAllPostsByLocation} filterByDate={this.props.actions.filterAllPostsByDate} />} />
            <Route path='/manage-gifts' render={()=><ManageGifts giftList={this.props.appState.gifts.gifts} setGift={this.props.actions.setGiftToEdit} />} />
            <Route path='/new-post' render={()=><NewPostForm createPost={this.props.actions.createNewPost} />} />
            <Route path='/new-gift' render={()=><NewGiftForm createGift={this.props.actions.createNewGift} />} />
            <Route path='/edit-post' render={()=><EditPost postToEdit={this.props.appState.posts.postToEdit} editPost={this.props.actions.editPost} />} />
            <Route path='/edit-gift' render={()=><EditGift giftToEdit={this.props.appState.gifts.giftToEdit} editGift={this.props.actions.editGift} />} />
            <Route path='/analytics' component={Analytics} />
            <Route path='/user/:id' render={()=><UserPointsForm userList={this.props.appState.users.users} transactionList={this.props.appState.transactions.transactions} location={this.props.location.pathname} findUsersTransactions={this.props.actions.findUsersTransactions} createTransaction={this.props.actions.createTransaction} />} />
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
    actions: bindActionCreators(Object.assign({}, userActionCreators, giftActionCreators, transactionActionCreators, postActionCreators), dispatch)
  };
};
App.propTypes = {
  appState: PropTypes.object
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

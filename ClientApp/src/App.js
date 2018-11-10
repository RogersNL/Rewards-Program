import React, {Component} from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Earn from './components/Earn';
import Error404 from './components/Error404';
import Transactions from './components/Transactions';
import Leaderboard from './components/Leaderboard';
import ClaimGifts from './components/ClaimGifts';
import Admin from './components/Admin';
import Analytics from './components/Analytics';
import ManageUsers from './components/ManageUsers';
import ManagePosts from './components/ManagePosts';
import ManageGifts from './components/ManageGifts';
import NewPostForm from './components/NewPostForm';
import NewGiftForm from './components/NewGiftForm';
import { userActionCreators } from './store/Users';
import { giftActionCreators } from './store/Gifts';
import { transactionActionCreators } from './store/Transactions';
import { postActionCreators } from './store/Posts';
import { weatherActionCreators} from './store/WeatherForecasts';


class App extends Component {
  componentWillMount() {
    // this.props.actions.requestUsers();
    // this.props.actions.requestGifts();
    // this.props.actions.requestTransactions();
    // this.props.actions.requestPosts();
    this.props.actions.requestWeatherForecasts();
  }
  render(){
    return(
      <div>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
            <Route path='/earn' render={()=><Earn postList={this.props.appState.posts.currentPosts} />} />
            <Route path='/transactions' render={()=><Transactions transactionList={this.props.appState.transactions.transactions} />} />
            <Route path='/leaderboard' render={()=><Leaderboard userList={this.props.appState.users.sortedUsers} />} />
            <Route path='/rewards' render={()=><ClaimGifts giftList={this.props.appState.gifts.gifts} />} />
            <Route path='/admin' component={Admin} />
            <Route path='/manage-users' render={()=><ManageUsers userList={this.props.appState.users.users} />} />
            <Route path='/manage-posts' render={()=><ManagePosts posts={this.props.appState.posts} filterByLocation={this.props.actions.filterPostsByLocation} filterByDate={this.props.actions.filterPostsByDate} />} />
            <Route path='/manage-gifts' render={()=><ManageGifts giftList={this.props.appState.gifts.gifts} />} />
            <Route path='/new-post' component={NewPostForm} />
            <Route path='/new-gift' component={NewGiftForm} />
            <Route path='/analytics' component={Analytics} />
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

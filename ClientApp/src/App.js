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
import { actionCreators } from './store/Users';

class App extends Component {
  componentWillMount() {
    this.props.actions.requestUsers();
  }
  render(){
    return(
      <div>
        <Layout>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
            <Route path='/earn' component={Earn} />
            <Route path='/transactions' component={Transactions} />
            <Route path='/leaderboard' render={()=><Leaderboard userList={this.props.appState.users.sortedUsers} />} />
            <Route path='/rewards' component={ClaimGifts} />
            <Route path='/admin' component={Admin} />
            <Route path='/manage-users' component={Leaderboard} />
            <Route path='/manage-posts' component={Earn} />
            <Route path='/manage-gifts' component={ClaimGifts} />
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
    actions: bindActionCreators(actionCreators, dispatch)
  };
};
App.propTypes = {
  appState: PropTypes.object
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

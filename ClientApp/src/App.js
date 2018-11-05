import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import FetchPostsData from './components/FetchPostsData';
import Error404 from './components/Error404';
import FetchTransactionsData from './components/FetchTransactionsData';
import FetchUsersData from './components/FetchUsersData';
import FetchGiftsData from './components/FetchGiftsData';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/counter' component={Counter} />
    <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
    <Route path='/earn' component={FetchPostsData} />
    <Route path='/transactions' component={FetchTransactionsData} />
    <Route path='/leaderboard' component={FetchUsersData} />
    <Route path='/rewards' component={FetchGiftsData} />
    <Route path='/admin' component={FetchUsersData} />
  </Layout>
);

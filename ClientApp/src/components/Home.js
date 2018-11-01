import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Grid, Row, Panel, Glyphicon } from 'react-bootstrap';
import './Home.css';

const Home = props => (
  <div>
    <h1>iLink Rewards</h1>
    <Grid fluid>
      <Row>
        <Col sm={6}>
          <Link to='/transactions'>
            <Panel>
              <h2>Transaction History</h2>
              <p>Track your points here!</p>
            </Panel>
          </Link>
        </Col>
        <Col sm={6}>
          <Link to='/leaderboard'>
            <Panel>
              <h2>Leaderboard</h2>
              <p>See where you stack up!</p>
            </Panel>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <Link to='/rewards'>
            <Panel>
              <h2>Claim Gifts</h2>
              <p>Have points? Claim your gift!</p>
            </Panel>
          </Link>
        </Col>
        <Col sm={6}>
          <Link to='/earn'>
            <Panel>
              <h2>Earn</h2>
              <p>Looking to earn more? Check out the new postings here!</p>
            </Panel>
          </Link>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default connect()(Home);

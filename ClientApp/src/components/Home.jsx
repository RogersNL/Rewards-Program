import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Grid, Row, Panel, Glyphicon, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Home(props) {
  function handleShowAdminRoute(){
    if(props.loggedInUser){
      if(props.loggedInUser.isAdmin){
        return(
          <Row>
            <Col sm={6}>
              <Link to='/admin'>
                <Panel>
                  <h2>Admin</h2>
                  <p>Manage Users, Posts, and Gifts</p>
                </Panel>
              </Link>
            </Col>
          </Row>
        )
      }
    }
  }
  return(
    <div>
      <Link to='/login'><Button className="login" bsStyle="primary">Log In</Button></Link>
      <a href='https://login.microsoftonline.com/iLinkRewards.onmicrosoft.com/oauth2/logout?post_logout_redirect_uri=https://localhost:5001'><Button className="login" bsStyle="danger">Log Out</Button></a>
      <h1>iLink Rewards</h1>
      <Grid fluid>
        <Row>
          <Col sm={6}>
            <Link to='/profile'>
              <Panel>
                <h2>Profile</h2>
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
        {handleShowAdminRoute()}
      </Grid>
      <style>{`
        a {
          color: #333;
          text-decoration: none;
        }
        a:hover {
          color: #333;
          text-decoration: none;
        }
        .panel {
          min-height: 180px;
          background-color: #e1e1e1;
        }

        .panel {
          vertical-align: middle;
          -webkit-transform: perspective(1px) translateZ(0);
          transform: perspective(1px) translateZ(0);
          box-shadow: 0 0 1px rgba(0, 0, 0, 0);
          -webkit-transition-duration: 0.3s;
          transition-duration: 0.3s;
          -webkit-transition-property: background;
          transition-property: background;
          box-shadow: inset 0 0 0 4px #e1e1e1, 0 0 1px rgba(0, 0, 0, 0);
          /* Hack to improve aliasing on mobile/tablet devices */
        }
        .panel:hover, .panel:focus, .panel:active {
          background: none;
        }
        .login {
          float: right;
          margin-right: 30px;
        }
      `}</style>
    </div>
  );
}
Home.propTypes ={
  loggedInUser: PropTypes.object
}
export default Home;

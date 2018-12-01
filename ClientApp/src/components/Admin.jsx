import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Grid, Row, Panel, Glyphicon } from 'react-bootstrap';

const Admin = props => (
  <div>
    <h1>Admin</h1>
    <Grid fluid>
      <Row>
        <Col sm={6}>
          <Link to='/manage-users'>
            <Panel>
              <h2>Manage Users</h2>
              <p>Add points to users and add users to groups</p>
            </Panel>
          </Link>
        </Col>
        <Col sm={6}>
          <Link to='/manage-posts'>
            <Panel>
              <h2>Manage Posts</h2>
              <p>Add new opportunities for points</p>
            </Panel>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <Link to='/manage-gifts'>
            <Panel>
              <h2>Manage Gifts</h2>
              <p>Add and remove gifts for claiming</p>
            </Panel>
          </Link>
        </Col>
        <Col sm={6}>
          <Link to='/analytics'>
            <Panel>
              <h2>Analytics</h2>
              <p>Usage data</p>
            </Panel>
          </Link>
        </Col>
      </Row>
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
        background-color: #9EA1A4;
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
        box-shadow: inset 0 0 0 4px #9EA1A4, 0 0 1px rgba(0, 0, 0, 0);
        /* Hack to improve aliasing on mobile/tablet devices */
      }
      .panel:hover, .panel:focus, .panel:active {
        background: none;
      }
    `}</style>
  </div>
);

export default Admin;

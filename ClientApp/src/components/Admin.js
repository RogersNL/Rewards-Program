import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Grid, Row, Panel, Glyphicon } from 'react-bootstrap';
import './Home.css';

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
  </div>
);

export default Admin;

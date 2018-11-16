import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import NavMenu from './NavMenu';
import PropTypes from 'prop-types';

function Layout(props) {
  return(
    <Grid fluid>
      <Row>
        <Col sm={3}>
          <NavMenu loggedInUser={props.loggedInUser}/>
        </Col>
        <Col sm={9}>
          {props.children}
        </Col>
      </Row>
    </Grid>
  );
}
Layout.propTypes = {
  loggedInUser: PropTypes.object
}
export default Layout;

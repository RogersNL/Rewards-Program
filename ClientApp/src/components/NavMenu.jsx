import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';

function NavMenu(props){
  function handleShowAdminRoute(){
    if(props.loggedInUser){
      if(props.loggedInUser.isAdmin){
        return(
          <LinkContainer to={'/admin'}>
            <NavItem>
              <Glyphicon glyph='wrench' /> Admin
            </NavItem>
          </LinkContainer>
        )
      }
    }
  }
  return(
    <Navbar inverse fixedTop fluid collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to={'/'}>iLink Rewards</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <LinkContainer to={'/'} exact>
            <NavItem>
              <Glyphicon glyph='home' /> Home
            </NavItem>
          </LinkContainer>
          <LinkContainer to={'/profile'}>
            <NavItem>
              <Glyphicon glyph='user' /> Profile
            </NavItem>
          </LinkContainer>
          <LinkContainer to={'/leaderboard'}>
            <NavItem>
              <Glyphicon glyph='glass' /> Leaderboard
            </NavItem>
          </LinkContainer>
          <LinkContainer to={'/rewards'}>
            <NavItem>
              <Glyphicon glyph='gift' /> Claim Gifts
            </NavItem>
          </LinkContainer>
          <LinkContainer to={'/earn'}>
            <NavItem>
              <Glyphicon glyph='piggy-bank' /> Earn
            </NavItem>
          </LinkContainer>
          {handleShowAdminRoute()}
        </Nav>
      </Navbar.Collapse>
      <style>{`
        .navbar li .glyphicon {
            margin-right: 10px;
        }

        /* Highlighting rules for nav menu items */
        .navbar .navbar-nav .active a,
        .navbar .navbar-nav .active a:hover,
        .navbar .navbar-nav .active a:focus {
            background-image: none;
            background-color: #4189C7;
            color: white;
        }

        @media (min-width: 768px) {
            /* On large screens, convert the nav menu to a vertical sidebar */
            .navbar {
                height: 100%;
                width: calc(25% - 20px);
            }
            .navbar {
                border-radius: 0;
                border-width: 0;
                height: 100%;
            }
            .navbar-header {
                float: none;
            }
            .navbar .navbar-collapse {
                border-top: 1px solid #444;
                padding: 0;
            }
            .navbar .container-fluid {
                padding: 0;
                margin: 0;
            }
            .navbar .container-fluid .navbar-brand {
                margin: 0;
            }
            .navbar ul {
                float: none;
            }
            .navbar li {
                float: none;
                font-size: 15px;
                margin: 6px;
            }
            .navbar li a {
                padding: 10px 16px;
                border-radius: 4px;
            }
            .navbar a {
                /* If a menu item's text is too long, truncate it */
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

      `}</style>
    </Navbar>
  );
}
NavMenu.propTypes = {
  loggedInUser: PropTypes.object
}
export default NavMenu;

import React, { Component } from 'react';
import "./nav.css";
import { connect } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import { withRouter } from 'react-router-dom';

class Navigation extends Component { 
  redirect(page) { 
    this.props.history.push(`${page}`)
  }

  logout() {
    this.props.history.push("/login");
    this.props.logout();
  }

  render() {
    return (
      <div>
        <Navbar sticky="top" bg="primary" variant="dark" className="navbar" collapseOnSelect expand="sm">
          <Navbar.Brand href="/">Workout Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={this.redirect.bind(this, "/home/")}>Home</Nav.Link>
              <Nav.Link onClick={this.redirect.bind(this, "/workouts/all/")}>Workouts</Nav.Link>
              <Nav.Link onClick={this.redirect.bind(this, "/profile/settings/")}>Your Profile</Nav.Link>
              <Nav.Link onClick={this.logout.bind(this)}>Sign Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch({type: "USER_LOGOUT"})
  }
};

export default withRouter(connect(null, mapDispatchToProps)(Navigation));
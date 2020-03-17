import React, { Component } from 'react';
import "./nav.css";
import { connect } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import { withRouter } from 'react-router-dom';

class Navigation extends Component { 
  constructor(props) { 
    super(props);

    this.state = {};
  }

  redirect(page) { 
    this.props.history.push(`${page}`)
  }

  logout() {
    this.props.history.push("/login");
    this.props.logout();
  }

  render() {

    if (this.props.theme != null) {
      return (
        <div>
          <Navbar sticky="top" bg={this.props.theme} variant={this.props.variant} className="navbar" collapseOnSelect expand="sm">
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
    } else { 
      return <div className="navbar"></div>
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch({type: "USER_LOGOUT"})
  }
};

export default withRouter(connect(null, mapDispatchToProps)(Navigation));
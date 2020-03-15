import React, { Component } from 'react';
import Body from "./body/body.js";
import Navigation from "./nav/nav.js";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

class Page extends Component {
  render() {
    return (
      <div className="App">
        <Navigation theme={this.props.theme} variant={this.props.variant} />
        <Body theme={this.props.theme} variant={this.props.variant} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Page));
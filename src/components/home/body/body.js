import React, { Component } from 'react';
import "./body.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { store } from "../../../redux/store.js";

class Body extends Component { 
  constructor(props) { 
    super(props);

    this.state = {
      isLoading: true
    }
  }

  render() {
    const currentState = store.getState().user.error === 200;
    while (currentState === false) { 
      return (
        store.dispatch({type: "USER_LOGOUT"})
      );
    }

    var d = new Date();
    var n = d.getHours();
    var timeOfDay = null;

    if (n >= 12) {
      timeOfDay = "Afternoon"
    } if (n <= 12) {
      timeOfDay = "Morning"
    } if (n >= 17) { 
      timeOfDay = "Night"
    }

    return (
      <div className="App">
        <h1 className="welcome" style={{color: `var(--${this.props.theme})`}}>Good {timeOfDay}, {this.props.currentUser}</h1>
      </div>
    );
  }
}   

const mapStateToProps = (state) => {
  return {
    currentUser: store.getState().user.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Body));
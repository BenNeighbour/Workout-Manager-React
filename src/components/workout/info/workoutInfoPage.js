import React, { Component } from 'react';
import { store } from "../../../redux/store.js";
import Body from "./body/body.js";
import { withRouter } from "react-router-dom";
import Navigation from "../../home/nav/nav.js";

import { connect } from "react-redux";

class WorkoutPage extends Component { 
  render() {
      return ( 
        <div>
            <Navigation theme={this.props.theme} variant={this.props.variant} />
            <Body id={this.props.currentWorkoutId} theme={this.props.theme} variant={this.props.variant} />
        </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        currentWorkoutId: store.getState().workout.currentWid
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkoutPage));
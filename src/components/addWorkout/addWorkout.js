import React, { Component } from 'react';
import { store } from "./../../redux/store.js";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Navigation from "./../home/nav/nav.js"
import "./addWorkout.css";
import { Body } from './body/body.js';
import axios from "axios";
import { getFormValues } from 'redux-form';

class AddWorkoutPage extends Component {
  submit = values => {
    const name = this.props.fields.name;
    const description = this.props.fields.description;
    const exerciseList = [];
    const duration = this.props.fields.duration;

    this.props.submitWorkout(name, exerciseList, description, duration);
  }

  render() {
    return (
        <div className="App">
          <Navigation />
          <h1 id="header">Add Workout</h1>
          <Body submit={this.submit.bind(this)}/>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  const selector = getFormValues("AddWorkoutForm")
  return {
    fields: selector(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {

    submitWorkout: (name, exerciseList, description, duration) => { 
      store.dispatch({
        type: "WORKOUT", payload:
          axios.post(
          `http://localhost:8080/api/v1/workout/save/?access_token=${store.getState().user.accessToken}`,
          { 
            "name": name,
            "exerciseList": exerciseList,
            "description": description,
            "duration": duration,
            "user": {
              "uid": store.getState().user.uid
            }
          }
        )
      })
    },


  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddWorkoutPage));
import React, { Component } from 'react';
import { store } from "./../../redux/store.js";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Navigation from "./../home/nav/nav.js"
import "./addWorkout.css";
import { Body } from './body/body.js';
import axios from "axios";
import { getFormValues } from 'redux-form';
import Loading from '../loading/loading.js';

class AddWorkoutPage extends Component {
  submit = async () => {
    const name = this.props.fields.name;
    const description = this.props.fields.description;
    const exerciseList = [];
    const duration = this.props.fields.duration;

    await this.props.submitWorkout(name, exerciseList, description, duration);

  }

  render() {
    if (this.props.theme !== null) {
      return (
        <div className="App">
          <Navigation theme={this.props.theme} variant={this.props.variant} />
          <Body submit={this.submit.bind(this)} theme={this.props.theme} variant={this.props.variant} />
        </div>
      );
    } else { 
      return <Loading />
    }
  }
}

const mapStateToProps = (state) => {
  const selector = getFormValues("AddWorkoutForm")
  return {
    fields: selector(state)
  }
};

const mapDispatchToProps = (dispatch) => {
  const config = {
    headers: {"Authorization": "Basic NTY0aGpnNDU2dXlkc2dmc2RnZnNkdXl0ZnRyeTM3M3Y1Y2JmZjpNeVN0cm9uZ1Bhc3N3b3Jk", "Content-type": "application/json"}
  };

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
          ).then(async (data) => {
            return data;
          }).catch(async (error) => {
            if (error.response.status === 401) {
              // Try refresh
              await store.dispatch({
                type: "USER_TOKEN_REFRESH", payload:
                  axios.post(
                    `http://localhost:8080/api/v1/user/login/?grant_type=refresh_token&refresh_token=${store.getState().user.refreshToken}`,
                    {},
                    config
                  ).then(async (data) => {
                    window.location.reload()
                    return data;
                  }).catch(async (error) => {
                    await store.dispatch({ type: "USER_LOGOUT" });
                    await this.props.history.push("/")
                    window.location.reload()
                  })
              })
            }
          })
      })
    }

  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddWorkoutPage));

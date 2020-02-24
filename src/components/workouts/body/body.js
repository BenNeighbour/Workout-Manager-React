import React, { Component } from 'react';
import "./body.css";

import { Button, Card } from "react-bootstrap"; 
import { withRouter } from "react-router-dom";
import img from "./sample_img.jpg";

import { store } from "../../../redux/store.js";

import axios from "axios";

import { connect } from "react-redux";

class Body extends Component { 

  redirect = values => {
    this.props.postPointingWid(values);
    this.props.history.push("/workout/info");
  } 

  getProperties = async () => { 
    const url = "http://localhost:8080/api/v1/user/username/by/" + store.getState().user.user +"/?access_token=" + store.getState().user.accessToken;
    await this.props.userPropertiesGet(url);
    await this.props.userWorkoutsGet(url);
  }

  componentDidMount() { 
    this.getProperties();
  }


  render() {
    return (
      this.props.workouts.map((card) => (
        <Card key={card.wid} className={"workoutCard"}>
          <Card.Img variant="top" src={img} />
          <Card.Body>
            <Card.Title>{card.name}</Card.Title>
            <Card.Text>
              <b>Duration: </b> {card.duration} minutes<br />
              {card.description}
            </Card.Text>
            <Button variant="outline-primary" onClick={this.redirect.bind(this, card.wid)}>Details</Button>
          </Card.Body>
        </Card>
      ))
    );
  }
}

const mapStateToProps = (state) => {
  const allWorkouts = store.getState().workout.allWorkouts;

  if (allWorkouts && allWorkouts !== undefined) {
    return {
      workouts: allWorkouts.reverse()
    }
  } else if (allWorkouts && allWorkouts === undefined) { 
    return {
      workouts: []
    }
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    userPropertiesGet: (url) => dispatch({
      type: "USER_UID", payload:
        axios.get(url)
    }),

    userWorkoutsGet: (url) => dispatch({
      type: "GET_WORKOUT", payload:
        axios.get(url)
    }),

    postPointingWid: (wid) => dispatch({
      type: "POST_CURRENT_WID", payload: wid
    })

  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Body));
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
    const url = "http://localhost:8080/api/v1/user/username/by/" + store.getState().user.user + "/?access_token=" + store.getState().user.accessToken;
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
            <Button variant={`outline-${this.props.theme}`} onClick={this.redirect.bind(this, card.wid)}>Details</Button>
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
  const config = {
    headers: {"Authorization": "Basic NTY0aGpnNDU2dXlkc2dmc2RnZnNkdXl0ZnRyeTM3M3Y1Y2JmZjpNeVN0cm9uZ1Bhc3N3b3Jk", "Content-type": "application/json"}
  };
  
  return {
    userPropertiesGet: (url) => dispatch({
      type: "USER_UID", payload:
        axios.get(url).then((data) => {
          return data;
        }).catch(async (error) => {
          if (error.response.status === 401) {
            // Try refresh
            await store.dispatch({ type: "USER_TOKEN_REFRESH", payload: 
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
    }),

    userWorkoutsGet: (url) => dispatch({
      type: "GET_WORKOUT", payload:
        axios.get(url).then((data) => {
          return data;
        }).catch(async (error) => {
          if (error.response.status === 401) {
            // Try refresh
            await store.dispatch({ type: "USER_TOKEN_REFRESH", payload: 
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
              })
            })
          }
        })
    }),

    postPointingWid: (wid) => dispatch({
      type: "POST_CURRENT_WID", payload: wid
    })

  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Body));
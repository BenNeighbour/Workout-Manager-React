import React, { Component } from 'react';
import "./body.css";
import { Button, Card } from "react-bootstrap"; 
import { withRouter } from "react-router-dom";
import { store } from "../../../redux/store.js";
import axios from "axios";
import { connect } from "react-redux";

class Body extends Component { 
  constructor(props) { 
    super(props);

    this.state = {
      imgData: []
    }
  }

  redirect = (wid, imgData) => {
    this.props.postPointingWid(wid);
    this.props.history.push({
      pathname: "/workout/info",
      state: { image: imgData }
    });
  } 

  getProperties = async () => { 
    const url = "http://localhost:8080/api/v1/user/username/by/" + store.getState().user.user + "/?access_token=" + store.getState().user.accessToken;
    await this.props.userPropertiesGet(url);
    await this.props.userWorkoutsGet(url);
    
    await this.props.workouts.map(async (card) => {
      await axios.get("http://localhost:8080/api/v1/workout/image/by/" + card.image.id)
        .then(async (data) => {
          let newArr = this.state.imgData;
          newArr.push(data.data)
          await this.setState({ imgData: newArr })
        })
    })
    
  }

  componentDidMount() {  
    this.getProperties();
  }

  render() {
    return (
      this.props.workouts.map((card, index) => (
        <Card key = { card.wid } className = { "workoutCard"} >
          {
            this.state.imgData !== [] && this.state.imgData[index] !== undefined ?
              <div className="image" style={{height: "300px"}}>
                <Card.Img variant="top" style={{ width: "100%", height: "100%", objectFit: "cover" }} src={`data:image/jpeg;base64,${this.state.imgData[index]}`} />
              </div> : undefined
          }
          <Card.Body>
            <Card.Title>{card.name}</Card.Title>
            <Card.Text>
            <b>Duration: </b> {card.duration} minutes<br />
            {card.description}
            </Card.Text>
            <Button variant={`outline-${this.props.theme}`} onClick={this.redirect.bind(this, card.wid, this.state.imgData[index])}>Details</Button>
          </Card.Body>
        </Card>
      )
      )
    )
    
    
  }
}

const mapStateToProps = (state) => {
  const allWorkouts = store.getState().workout.allWorkouts;

  if (allWorkouts && allWorkouts !== undefined) {
    return {
      workouts: allWorkouts.reverse()
    }
  }

  return {
    workouts: []
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
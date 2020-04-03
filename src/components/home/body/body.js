import React, { Component } from 'react';
import "./body.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { store } from "../../../redux/store.js";
import Content from "./content/todoList/content.js";
import axios from "axios";

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
        <h1 className="welcome" style={{ color: `var(--${this.props.theme})` }}>Good {timeOfDay}, {this.props.currentUser}</h1>
        <Content day={this.props.day} getWorkouts={this.props.userWorkoutsGet.bind(this)} saveTodos={this.props.saveTodos} theme={this.props.theme} variant={this.props.variant} />
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
  const config = {
    headers: {"Authorization": "Basic NTY0aGpnNDU2dXlkc2dmc2RnZnNkdXl0ZnRyeTM3M3Y1Y2JmZjpNeVN0cm9uZ1Bhc3N3b3Jk", "Content-type": "application/json"}
  };
  
  return {
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
                window.location.reload()
              })
            })
          }
        })
    }),
  };
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Body));
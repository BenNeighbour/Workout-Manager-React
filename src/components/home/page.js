import React, { Component } from 'react';
import Body from "./body/body.js";
import Navigation from "./nav/nav.js";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import Loading from '../loading/loading.js';
import { store } from "./../../redux/store.js";
import axios from "axios";

class Page extends Component {
  constructor(props) { 
    super(props);

    this.state = {
      isLoading: true
    }
  }

  getProperties = async () => {
    await this.props.getTodos(store.getState().user.uid, store.getState().user.user);
    this.setState({
      isLoading: false
    });
  }

  componentDidMount() {
    this.getProperties()
  }

  render() {
    if (this.props.theme !== null && !this.state.isLoading) {
      return (
        <div className="App">
          <Navigation theme={this.props.theme} variant={this.props.variant} />
          <Body day={this.props.today} saveTodos={this.props.saveTodos.bind()} theme={this.props.theme} variant={this.props.variant} />
        </div>
      );
    } else { 
      return <Loading message="Loading..." />
    }
  }
}

const mapStateToProps = (state) => {
  let current = new Date();
  let today = current.toLocaleDateString('en-US', { weekday: 'long' });

  return {
    day: today
  }
};

const mapDispatchToProps = (dispatch) => {
  let current = new Date();
  let today = current.toLocaleDateString('en-US', { weekday: 'long' });

  const config = {
    headers: {"Authorization": "Basic NTY0aGpnNDU2dXlkc2dmc2RnZnNkdXl0ZnRyeTM3M3Y1Y2JmZjpNeVN0cm9uZ1Bhc3N3b3Jk", "Content-type": "application/json"}
  };

  return {

    getTodos: (uid, username) => dispatch({
      type: "GET_TODOS", payload: 
        axios.get(
          `http://localhost:8080/api/v1/user/todos/${uid}/${username}/${today}/?access_token=${store.getState().user.accessToken}`
        ).then((data) => {
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

    saveTodos: (uid, username, wid, todo, completed) => dispatch({
      type: "COMPLETE_TODOS", payload: 
        axios.post(
          `http://localhost:8080/api/v1/user/todos/${uid}/${username}/${todo.workout.name}/${completed}/?access_token=${store.getState().user.accessToken}`,
        ).then((data) => {
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
                return data;
              }).catch(async (error) => { 
                await store.dispatch({ type: "USER_LOGOUT" });
                await this.props.history.push("/")
              })
            })
          }
        })
    })
  }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Page));
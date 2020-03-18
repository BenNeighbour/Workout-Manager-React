import React, { Component } from 'react';
import { store } from "../../redux/store.js";
import { getFormValues } from 'redux-form';
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import LoginForm from "./form/loginForm.js";
import qs from "querystring";
import "./loginView.css";

class Login extends Component { 

  submit = async () => { 
    const url1 = "http://localhost:8080/api/v1/user/login/?grant_type=password";
    let username = this.props.credentials.username;
    let password = this.props.credentials.password;
    await this.props.submitCredentials(url1, username, password);

    this.redirect();

    const url2 = "http://localhost:8080/api/v1/user/username/by/" + store.getState().user.user + "/?access_token=" + store.getState().user.accessToken;
    await this.props.userPropertiesGet(url2)
  }

  redirect = values => {
    const currentUser = store.getState().form.LoginForm.values.username;

    store.dispatch({ type: "ADD_USERNAME", payload: currentUser });
    this.props.history.push("/home");
  }

  signup = values => { 
    this.props.history.push("/signup");
  }

  render() {
    return ( 
      <div className="container">
        <LoginForm onSubmit={this.submit} redirect={this.signup.bind(this)} /> 
      </div> 
    );
  }
 
}

const mapStateToProps = (state) => {
  const selector = getFormValues("LoginForm")
  return {
    credentials: selector(state)
  }
};

const mapDispatchToProps = (dispatch) => {

  const config = {
    headers: {"Authorization": "Basic NTY0aGpnNDU2dXlkc2dmc2RnZnNkdXl0ZnRyeTM3M3Y1Y2JmZjpNeVN0cm9uZ1Bhc3N3b3Jk", "Content-type": "application/x-www-form-urlencoded"}
  }; 
  

  return {
    submitCredentials: (url, username, password) => dispatch({
      
      type: "USER_GRANT", payload:
        axios.post(
          url,
          qs.stringify({
            username: username,
            password: password
          }),
          config
        )
    }),

    userPropertiesGet: (url) => dispatch({
      type: "HOME_USER_UID", payload:
        axios.get(url)
    }),

    logout: () => dispatch({type: "USER_LOGOUT"})
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
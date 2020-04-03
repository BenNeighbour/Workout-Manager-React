import React, { Component } from 'react';
import { getFormValues } from 'redux-form';
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SignupForm from "./form/signupForm.js";
import "./form/signupView.css";
import { store } from "./../../redux/store.js";

class Signup extends Component { 

    submit = async () => { 
        const url = "http://localhost:8080/api/v1/user/signup/";
        const username = this.props.credentials.username;
        const password = this.props.credentials.password;
        const email = this.props.credentials.email;
        const dob = this.props.credentials.dob;

        await this.props.logout();
        await this.props.credentialsPost(url, email, username, password, dob);
    }
    
    login = values => {
        this.props.history.push("/login");
    }

    componentWillUnmount() { 
        store.dispatch({ type: "UNMOUNT_EMAIL_MESSAGE"});
    }

    componentDidMount() { 
        if (store.getState().user.isAuthenticated === true) {
            store.dispatch({ type: "USER_LOGOUT" })
        }
    }

    render() {
        return ( 
            <div className="container">
                <SignupForm onSubmit={this.submit} redirect={this.login.bind(this)}/> 
            </div> 
        );
    }
 
}

const mapStateToProps = (state) => {
    const selector = getFormValues("SignupForm")
    return {
        credentials: selector(state)
    }
};
  
const mapDispatchToProps = (dispatch) => {

    return {
        credentialsPost: (url, email, username, password, dob) => dispatch({
        type: "USER_SIGNUP", payload:
            axios.post(
                url,
                {
                    "username": username,
                    "email": email,
                    "password": password,
                    "dateOfBirth": dob
                }
            )
        }),

        logout: () => dispatch({type: "USER_LOGOUT"})
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
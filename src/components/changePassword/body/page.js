import React from 'react';
import { withRouter } from 'react-router-dom';
import ChangePasswordForm from './form/changePasswordForm';
import { connect } from "react-redux";
import { getFormValues } from "redux-form";
import axios from "axios";

class ChangePasswordPage extends React.Component { 
    render() { 
        return (
            <div className="App">
                <ChangePasswordForm onSubmit={this.props.credentialsPost.bind(this, "http://localhost:8080/api/v1/user/password/request/change/", this.props.credentials)} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const selector = getFormValues("ChangePasswordForm")
    return {
        credentials: selector(state)
    }
};
  
const mapDispatchToProps = (dispatch) => {

    return {
        credentialsPost: (url, email) => dispatch({
            type: "USER_CHANGE_PASSWORD", payload:
                axios.get(
                    `${url}${email.email}`
                )
        })
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangePasswordPage));
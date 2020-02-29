import React from 'react';
import { withRouter } from 'react-router-dom';
import ChangePasswordForm from './form/changePasswordForm';
import { connect } from "react-redux";
import { getFormValues } from "redux-form";

class ChangePasswordPage extends React.Component { 
    render() { 
        return (
            <div className="App">
                <ChangePasswordForm onSubmit={this.props.credentialsPost} />
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
        credentialsPost: () => dispatch({
            type: "USER_SIGNUP", payload: null
        })
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangePasswordPage));
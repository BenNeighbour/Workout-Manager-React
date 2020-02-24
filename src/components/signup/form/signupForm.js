import React from 'react';
import { reduxForm, Field } from "redux-form";
import { Button } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import "./signupView.css";
import validate from "./validator/validate.js";
import { store } from '../../../redux/store';

let SignupForm = props => {
    const { handleSubmit } = props;
    const isSignedUp = store.getState().user.signedUp;

    return ( 
        <form onSubmit={handleSubmit} className="signupForm">
            <h1 className="logo">Workout Manager</h1>
            <Field type="text"
                name="username" label="Username"
                component={renderField}
            />
            <Field
                type="email" name="email"
                label="Email Address" component={renderField}
            />
            <Field
                name="password" type="password"
                label="Password"
                component={renderField}
            />
            <Field
                name="confirmPassword" type="password"
                label="Confirm Password" component={renderField}
            />

            {
                isSignedUp === true ? <p style={{ color: "green", fontWeight: "90%", marginBottom: "12px", marginTop: "0px"}}>Verification Email Sent!</p> : undefined
            }
            
            <div className="submit-btn">
                <Button type="submit" variant="outline-primary" className="submit-btn">Sign Up</Button>
            </div>
            <p className="or">---- or ----</p>
            <div className="submit-btn">
                <Button variant="outline-primary" className="submit-btn" onClick={props.redirect}>Log In</Button>
            </div>

        </form>
    );
};

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div className="field">
        <input {...input} className="form-control" placeholder={label} type={type} />

        <div className="message">
            {touched && ((error && <p style={{ marginBottom: "0px", marginTop: "0px", color: "red"}}>{error}</p>) || (warning && <p>{warning}</p>))}
        </div>
    </div>
);

SignupForm = reduxForm({
    form: "SignupForm",
    validate
})(SignupForm);

export default withRouter(SignupForm);
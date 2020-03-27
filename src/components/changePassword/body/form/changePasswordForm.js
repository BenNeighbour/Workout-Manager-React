import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Button } from "react-bootstrap";
import validate from "./validator/validate.js";
import { withRouter } from 'react-router-dom';

let ChangePasswordForm = (props) => { 
    const isEmailSent = false;

    return ( 
        <form onSubmit={props.handleSubmit} className="loginForm">
            <h1 className="logo">Change Password</h1>
            <Field
                type="email" name="email" component={renderField}
                label="Email Address" placeholder="Email Address" />
            
            {
                false ? <p style={{ color: "red", fontWeight: "90%", marginBottom: "12px", marginTop: "0px"}}>{`Error:`}</p> : undefined
            }

            {
                isEmailSent === true ? <p style={{ color: "green", fontWeight: "90%", marginBottom: "12px", marginTop: "0px"}}>Verification Email Sent!</p> : undefined
            }
    
            <div className="submit-btn">
                <Button type="submit" variant="outline-primary" className="submit-btn">Send Verification Email</Button>
            </div>
            <p className="or">---- or ----</p>
            <div className="submit-btn">
                <Button variant="outline-primary" className="submit-btn" onClick={() => { 
                    props.history.push("/login")
                }}>Sign In to Your Account</Button>
            </div>
        </form>
    );
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div className="field">
        <input {...input} className="form-control" placeholder={label} type={type} />

        <div className="message">
            {touched && ((error && <p style={{ marginBottom: "0px", marginTop: "0px", color: "red"}}>{error}</p>) || (warning && <p>{warning}</p>))}
        </div>
    </div>
);

ChangePasswordForm = reduxForm({
    form: "ChangePasswordForm",
    validate
})(ChangePasswordForm);

export default withRouter(ChangePasswordForm);
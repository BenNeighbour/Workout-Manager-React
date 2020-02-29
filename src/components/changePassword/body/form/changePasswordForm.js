import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Button } from "react-bootstrap";
import validate from "./validator/validate.js";

let ChangePasswordForm = props => { 
    const { handleSubmit } = props;
    const isEmailSent = true;

    return ( 
        <form onSubmit={handleSubmit} className="loginForm">
            <h1 className="logo">Reset Password</h1>
            <Field
                type="email" name="email" component={renderField}
                label="Email Address" placeholder="Email Address" />
        
            <Field name="password" component={renderField} type="password"
                label="Password" placeholder="Password" />
            
            <Field name="confirmPassword" component={renderField} type="password"
                label="Confirm Password" placeholder="Confirm Password" />
            
            {
                false ? <p style={{ color: "red", fontWeight: "90%", marginBottom: "12px", marginTop: "0px"}}>{`Error:`}</p> : undefined
            }

            {
                isEmailSent === true ? <p style={{ color: "green", fontWeight: "90%", marginBottom: "12px", marginTop: "0px"}}>Verification Email Sent!</p> : undefined
            }
    
            <div className="submit-btn">
                <Button type="submit" variant="outline-primary" className="submit-btn">Send Verification Email</Button>
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

export default ChangePasswordForm;
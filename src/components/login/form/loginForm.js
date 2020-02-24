import React from 'react';
import { reduxForm, Field } from "redux-form";
import { Button } from 'react-bootstrap';
import "../loginView.css";
import { withRouter } from "react-router-dom";
import validate from "./validator/validate.js";
import { store } from "./../../../redux/store.js";

let LoginForm = props => {
    const { handleSubmit } = props;

    return ( 
        <form onSubmit={handleSubmit} className="loginForm">
            <h1 className="logo">Workout Manager</h1>
            <Field
                type="text" name="username" component={renderField}
                label="Username" placeholder="Username" />
        
            <Field name="password" component={renderField} type="password"
                label="Password" placeholder="Password" />

            <a href="/verify/send" style={{ color: "#007bff", fontWeight: "90%", marginBottom: "12px"}}>Forgot Password?</a>
            
            {
                store.getState().user.error !== 200 ? <p style={{ color: "red", fontWeight: "90%", marginBottom: "12px", marginTop: "0px"}}>{`Error: ${store.getState().user.error}`}</p> : undefined
            }
    
            <div className="submit-btn">
                <Button type="submit" variant="outline-primary" className="submit-btn">Sign In</Button>
            </div>
            <p className="or">---- or ----</p>
            <div className="submit-btn">
                <Button variant="outline-primary" className="submit-btn" onClick={props.redirect}>Sign Up to Workout Manager</Button>
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

LoginForm = reduxForm({
    form: "LoginForm",
    validate
})(LoginForm);

export default withRouter(LoginForm);
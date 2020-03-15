import React, {  } from 'react'; 
import { reduxForm, Field } from "redux-form";
import { Button } from 'react-bootstrap';
import validate from "./validator/validate";
import { withRouter } from 'react-router-dom';
import "./customForm.css";

let AccountInfoForm = props => {
    const { handleSubmit } = props;
    document.documentElement.style.setProperty("--custom", `var(--${props.theme})`);

    return (
        <form onSubmit={handleSubmit} className="App">
            <h1 className="welcome" style={{ fontSize: "225%", marginTop: "0px", paddingTop: "0px", marginLeft: "0", color: `var(--${props.theme})` }}>Account Information</h1>
            
            <Field name="updateUsername" label="Username" type="text"
                component={renderField} />
            
            <Field name="updateEmail" label="Email" type="email" theme={props.theme}
                component={renderField} />
            
            <Button variant={`outline-${props.theme}`} style={{ margin: "3.5px" }} onClick={() => { 
                props.history.push("/changepassword/")
            }}>Change Password</Button>
            
            <Field label="Date of Birth"
                name="updateDOB" type="date"
                component={renderField} />
            
            <br />
            <Button variant={`outline-${props.theme}`} style={{ margin: "3.5px" }}
                type="submit">Update Information</Button>
    
        </form>
    );
}

const renderField = ({ value, hidden, input, theme, label, type, meta: { touched, error, warning } }) => (
    <div hidden={hidden} className="field">
        <input hidden={hidden} disabled={hidden} value={value} {...input} style={{marginLeft: "3.5px", margin: "5px", width: "97.3%"}} id="custom-field" className="form-control" placeholder={label} type={type} />

        <div className="message">
            {touched && ((error && <p style={{ marginBottom: "0px", marginTop: "0px", color: "red"}}>{error}</p>) || (warning && <p>{warning}</p>))}
        </div>
    </div>
);

AccountInfoForm = reduxForm({
    form: "AccountInfoForm",
    validate: validate,
    enableReinitialize: true
})(AccountInfoForm);

export default withRouter(AccountInfoForm);
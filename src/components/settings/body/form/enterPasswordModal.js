import React, { useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { Field, reduxForm } from "redux-form";

let EnterPasswordModal = (props) => {
    const [show, setShow] = useState(props.showing);

    const handleClose = () => setShow(false);
  
    if (show === false) {
        window.location.reload()
    }
    
    return (
        <div>
            <Modal show={show} style={{ height: "fit-content" }} onHide={handleClose}>
                <Modal.Header style={{ border: "none" }} closeButton></Modal.Header>
                <Modal.Body style={{ height: "50vh" }}>
                    <form onSubmit={props.handleSubmit} style={{transform: "translate(-50%,-56%)"}} className="loginForm">
                        <h1 className="logo">Change Information</h1>
                        <Field
                            type="password" name="verifyPassword" component={renderField}
                            label="Password" placeholder="Password" />
                    
                        <p className="or">(This will redirect you to the landing page, please then log in with the changes)</p>
                        
                        <div className="submit-btn">
                            <Button type="submit" variant="outline-primary" className="submit-btn">Change Info</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
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

EnterPasswordModal = reduxForm({
    form: "VerifyChangesForm"
})(EnterPasswordModal);

export default withRouter(EnterPasswordModal);
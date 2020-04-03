import React, { useState } from 'react';
import { Modal } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { reduxForm, Field } from "redux-form"; 
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { store } from "./../../../../../../redux/store.js";
import "./addTodoForm.css";

let AddTodoModal = (props) => {
    const [show, setShow] = useState(props.showing);

    const handleClose = () => setShow(false);
  
    if (show === false) {
        window.location.reload()
    }
    
    return (
        <div>
            <Modal show={show} style={{ height: "fit-content" }} onHide={handleClose}>
                <Modal.Header style={{ border: "none" }} closeButton></Modal.Header>
                <Modal.Body style={{ height: "70vh", display: "inline-block" }}>
                    <Form onSubmit={props.handleSubmit} style={{ height: "100%", width: "100%", transform: "translate(-50%,-56%)" }} className="loginForm">
                        <h1 style={{ height: "auto", color: "var(--custom)" }} className="logo">Add Todo</h1>
                        
                        <Field style={{ width: "80%", marginBottom: "2vh" }} value="..." name="workout" className="custom-select" component="select">
                            <option value={null}>...</option>
                            {
                                store.getState().workout.allWorkouts.map((workout, index) => (
                                    <option value={workout.name} style={{ overflowX: "hidden" }} key={`${workout.name}-${index}`}>{workout.name}</option>
                                ))
                            }
                        </Field>

                        <Field style={{ width: "80%", marginBottom: "2vh" }} name="day" value="..." className="custom-select" component="select">
                            <option value={null}>...</option>
                            <option value="Monday" style={{ overflowX: "hidden" }}>Monday</option>
                            <option value="Tuesday" style={{ overflowX: "hidden" }}>Tuesday</option>
                            <option value="Wednesday" style={{ overflowX: "hidden" }}>Wednesday</option>
                            <option value="Thursday" style={{ overflowX: "hidden" }}>Thursday</option>
                            <option value="Friday" style={{ overflowX: "hidden" }}>Friday</option>
                            <option value="Saturday" style={{ overflowX: "hidden" }}>Saturday</option>
                            <option value="Sunday" style={{ overflowX: "hidden" }}>Sunday</option>
                        </Field>

                        <label style={{ width: "80%", marginBottom: "2vh", paddingBottom: "2vh", lineHeight: "2.5vh" }}><Field id="custom-field-description" style={{ height: "130px", maxHeight: "130px", minHeight: "130px" }} placeholder="Todo Description" component="textarea" name="description" className="form-control" /></label>

                        {
                            store.getState().todo.error !== 200 ? <p style={{ color: "red", fontWeight: "90%", marginBottom: "12px", marginTop: "0px"}}></p> : undefined
                        }

                        <div style={{ height: "auto" }} className="submit-btn">
                            <Button type="submit" variant={`outline-${props.theme}`} className="submit-btn">Create Todo</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

AddTodoModal = reduxForm({
    form: "AddTodoForm",
    enableReinitialize: true
})(AddTodoModal);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddTodoModal));
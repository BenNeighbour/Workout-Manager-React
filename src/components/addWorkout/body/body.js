import React, { Component } from "react";
import "../addWorkout.css";
import { Button, Form } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import "./body.css";
import img from "./../sample.jpg"

class Body extends Component {
    render() {
        return (
            <div className="App">
                <AddWorkoutForm theme={this.props.theme} variant={this.props.variant} onSubmit={this.props.submit} />
            </div>
        );
    }
}

let AddWorkoutForm = props => {
    const { handleSubmit } = props;
    document.documentElement.style.setProperty("--custom", `var(--${props.theme})`);

    return ( 
        <Form onSubmit={handleSubmit} className="AddWorkoutForm">
            <div className="top" style={{ height: "max-content", overflow: "hidden" }}>
                
                <div className="metadata" style={{ width: "50%", float: "left" }}>
                    <h1 id="header" style={{color: `var(--${props.theme})`}}>Add Workout</h1>
                    <h1 className="name" style={{color: `var(--${props.theme})`}}>Name:</h1><Field type="text" style={{ width: "90%" }} name="name" component="input" placeholder="Workout Name" className="form-control" id="custom-field" />
                    <h1 className="description" style={{ color: `var(--${props.theme})` }}>Description:</h1><Field style={{ height: "130px", maxHeight: "130px", minHeight: "130px", width: "90%" }} component="textarea" type="text" name="description" placeholder="Description" className="form-control" id="custom-field" />
                    <Button variant={`outline-${props.theme}`} type="submit">Save</Button>
                </div>
            
                <div className="image-area" style={{ width: "45%", float: "right", margin: "1.5vw" }}>
                    <img src={img} style={{ width: "100%" }} alt="none" />
                </div>

            </div>
        </Form>
    );
};

AddWorkoutForm = reduxForm({
    form: "AddWorkoutForm"
})(AddWorkoutForm);

export { Body, AddWorkoutForm };
  

import React, { Component } from "react";
import "../addWorkout.css";
import { Button } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import "./body.css";

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
        <form onSubmit={handleSubmit} className="AddWorkoutForm">
            <h1 className="name" style={{color: `var(--${props.theme})`}}>Name:</h1><Field type="text" name="name" component="input" placeholder="Workout Name" className="form-control" id="custom-field" />
            <h1 className="description" style={{color: `var(--${props.theme})`}}>Description:</h1><Field type="text" name="description" component="input" placeholder="Description" className="form-control" id="custom-field" />
            <Button variant={`outline-${props.theme}`} type="submit">Save</Button>
        </form>
    );
};

AddWorkoutForm = reduxForm({
    form: "AddWorkoutForm"
})(AddWorkoutForm);

export { Body, AddWorkoutForm };
  

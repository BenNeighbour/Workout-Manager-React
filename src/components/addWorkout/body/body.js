import React, { Component } from "react";
import "../addWorkout.css";
import { Button } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";

class Body extends Component {
    render() {
        return (
            <div className="App">
                <AddWorkoutForm onSubmit={this.props.submit} />
            </div>
        );
    }
}

let AddWorkoutForm = props => {
    const { handleSubmit } = props;

    return ( 
        <form onSubmit={handleSubmit} className="AddWorkoutForm">
            <h1 className="name">Name:</h1><Field type="text" name="name" component="input" placeholder="Workout Name" className="form-control" id="name" />
            <h1 className="description">Description:</h1><Field type="text" name="description" component="input" placeholder="Description" className="form-control" id="description" />
            <Button variant="outline-primary" type="submit">Save</Button>
        </form>
    );
};

AddWorkoutForm = reduxForm({
    form: "AddWorkoutForm"
})(AddWorkoutForm);

export { Body, AddWorkoutForm };
  

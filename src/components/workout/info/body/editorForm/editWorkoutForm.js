import React, {  } from 'react';
import { reduxForm, Field } from "redux-form";
import { Button, Tab, Tabs } from "react-bootstrap";
import { getFormValues } from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { store } from "./../../../../../redux/store.js";
import axios from "axios";

let EditForm = props => {
    const { handleSubmit } = props;

    return ( 
        <form onSubmit={handleSubmit} className="editForm">
            <h1 id="header">Edit</h1>
            <b className="name">Name:</b>
            <Field
                type="text" name="name" component={renderField}
                id="name" label="Workout Name" />
            
            <b className="description">Description:</b>
            <Field type="text" name="description" component={renderField} label="Description" />

            <Tabs defaultActiveKey={0} style={{margin: "22.5px", overflowY: "hidden"}}>
                {
                    props.exerciseList.map((exercise, index) => (
                        <Tab eventKey={`${exercise.name} ${index} ${exercise.eid}`} key={index} id="header" title={exercise.name}>

                            <b style={{ fontSize: "125%", paddingLeft: "6px" }} className="name" key={`${exercise.name} reps ${index}`}>Reps:</b>
                            <Field
                                type="number" name={`exercises[${index}].reps`} component={renderField}
                                label="Reps" />

                            <b style={{ fontSize: "125%", paddingLeft: "6px" }} className="name" key={`${exercise.name} sets ${index}`}>Sets:</b>
                            <Field
                                type="number" name={`exercises[${index}].sets`} component={renderField}
                                label="Sets" />
                            
                            <b style={{ fontSize: "125%", paddingLeft: "6px" }} className="name" key={`${exercise.name} duration ${index}`}>Duration:</b>
                            <Field
                                type="number" name={`exercises[${index}].duration`} component={renderField}
                                label="Duration" />
                            
                            <b style={{ fontSize: "125%", paddingLeft: "6px" }} className="name" key={`${exercise.name} calsBurnt ${index}`}>Calories Burnt:</b>
                            <Field
                                type="number" name={`exercises[${index}].burntCals`} component={renderField}
                                label="Calories Burnt" />

                        </Tab>
                    ))
                }

                <Tab eventKey="divider" title="  " disabled></Tab>
                
                <Tab eventKey="" id="header" title="Add">
                    <b style={{ fontSize: "125%", paddingLeft: "6px" }} className="name" >Name:</b>
                    <Field
                        type="text" name="addName" component={renderField}
                        label="Name" />

                    <b style={{ fontSize: "125%", paddingLeft: "6px" }} className="name" >Reps:</b>
                    <Field
                        type="number" name="addReps" component={renderField}
                        label="Reps" />

                    <b style={{ fontSize: "125%", paddingLeft: "6px" }} className="name">Sets:</b>
                    <Field
                        type="number" name="addSets" component={renderField}
                        label="Sets" />

                    <b style={{ fontSize: "125%", paddingLeft: "6px" }} className="name">Duration:</b>
                    <Field
                        type="number" name="addDuration" component={renderField}
                        label="Duration" />

                    <b style={{ fontSize: "125%", paddingLeft: "6px" }} className="name">Calories Burnt:</b>
                    <Field
                        type="number" name="addCalsBurnt" component={renderField}
                        label="Calories Burnt" />

                    <button variant="outline-primary" type="button" className="btn btn-outline-primary" onClick={() => {
                        props.exerciseList.push({
                            name: props.addFormValues.addName,
                            reps: props.addFormValues.addReps,
                            sets: props.addFormValues.addSets,
                            duration: props.addFormValues.addDuration,
                            burntCals: props.addFormValues.addCalsBurnt
                        })

                        submitNewExercise(props.exerciseList, props.addExercise)

                        props.reset()

                        return props.exerciseList;

                     }}>Add</button>

                </Tab>
            </Tabs>
            
            <Button type="button" variant="outline-primary">Back</Button>
            <Button variant="outline-primary" type="submit">Save</Button>
        </form>
    );
    
};

let submitNewExercise = (exercises, helper) => {
    exercises.map((exercise) => {
        helper(exercise.eid, exercise.name, exercise.reps, exercise.sets, exercise.duration, exercise.burntCals);
        return exercise;
    });
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div className="field">
        <input {...input} className="form-control" placeholder={label} type={type} id="duration" />

        <div className="message">
            {touched && ((error && <p style={{ marginBottom: "0px", marginTop: "0px", color: "red" }}>{error}</p>) || (warning && <p>{warning}</p>))}
        </div>
    </div>
);


const mapStateToProps = (state) => {
    const selector = getFormValues("EditForm");

    return {
        addFormValues: selector(state)
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        addExercise: (eid, name, reps, sets, duration, burntCals) => dispatch({ 
            // Do axios PUT request for each exercise
            type: "EXERCISE_ALTER", payload:
                axios.put(
                    `http://localhost:8080/api/v1/workout/exercise/update/?access_token=${store.getState().user.accessToken}`,
                    {
                        "eid": eid,
                        "name": name,
                        "reps": reps,
                        "sets": sets,
                        "duration": duration,
                        "workout": {
                            "wid": store.getState().workout.currentWid 
                        }
                    }
                )
        })
    }
};

EditForm = reduxForm({
    form: "EditForm",
    enableReinitialize: true
})(EditForm);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditForm, submitNewExercise));
import React, { useCallback } from 'react';
import { reduxForm, Field } from "redux-form";
import { Button, Tab, Tabs, Form } from "react-bootstrap";
import { getFormValues } from "redux-form";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { store } from "./../../../../../redux/store.js";
import axios from "axios";
import "./editForm.css";

let EditForm = props => {
    const { handleSubmit, change } = props;
    document.documentElement.style.setProperty("--custom", `var(--${props.theme})`);

    const [, updateState] = React.useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    const [stateProps, setStateProps] = React.useState(`data:image/jpeg;base64,${props.image}`);

    return (
        <Form onSubmit={handleSubmit} className="editForm">

            <div className="top" style={{ height: "max-content", overflow: "hidden" }}>
                <div className="metadata" style={{ width: "50%", float: "left" }}>
                    <h1 id="header" style={{color: `var(--${props.theme})`}}>Edit</h1>
                    <b className="name" style={{color: `var(--${props.theme})`}}>Name:</b>
                    <Field
                        type="text" name="name" component={renderField}
                        id="name" label="Workout Name" />
                    
                    <b className="description" style={{color: `var(--${props.theme})`}}>Description:</b>
                    <Field type="text" name="description" id="custom-field" className="form-control" style={{ height: "130px", maxHeight: "130px", minHeight: "130px", width: "90%" }} component="textarea" label="Description" />

                </div>

                <div className="image-area" style={{ width: "45%", float: "right", margin: "1.5vw" }}>
                    <img style={{ width: "110%" }} alt="none" src={`${stateProps}`} />

                    <div className="custom-file" style={{ overflow: "hidden" }}>
                        <input type="file" className="custom-file-input" id="inputGroupFile01" onChange={async function change(event) {

                            // Convert image to Base64
                            const toBase64 = file => new Promise((resolve, reject) => {
                                const reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onload = () => resolve(reader.result);
                                reader.onerror = error => reject(error);
                            });

                            let converted = await toBase64(event.target.files[0])

                            setStateProps(converted)

                            // Upload image as Base64 string
                            const imageParam = new FormData();
                            imageParam.append('image', converted);

                            props.uploadImage(imageParam);
                            
                        }} />
                        <label className="custom-file-label" aria-describedby="inputGroupFileAddon02">Upload image</label>
                    </div>
                </div>
            </div>

            <Tabs defaultActiveKey={0} style={{margin: "22.5px", overflowY: "hidden"}}>
                {
                    props.exerciseList.map((exercise, index) => (
                        <Tab eventKey={`${exercise.name} ${index} ${exercise.eid}`} key={index} id="header" title={exercise.name}>

                            <b style={{ fontSize: "125%", paddingLeft: "6px", color: `var(--${props.theme})`}} className="name" key={`${exercise.name} name ${index}`}>Name:</b>
                            <Field
                                type="text" name={`exercises[${index}].name`} component={renderField}
                                label="Name" />

                            <b style={{ fontSize: "125%", paddingLeft: "6px", color: `var(--${props.theme})`}} className="name" key={`${exercise.name} reps ${index}`}>Reps:</b>
                            <Field
                                type="number" name={`exercises[${index}].reps`} component={renderField}
                                label="Reps" />

                            <b style={{ fontSize: "125%", paddingLeft: "6px", color: `var(--${props.theme})`}} className="name" key={`${exercise.name} sets ${index}`}>Sets:</b>
                            <Field
                                type="number" name={`exercises[${index}].sets`} component={renderField}
                                label="Sets" />
                            
                            <b style={{ fontSize: "125%", paddingLeft: "6px", color: `var(--${props.theme})`}} className="name" key={`${exercise.name} duration ${index}`}>Duration:</b>
                            <Field
                                type="number" name={`exercises[${index}].duration`} component={renderField}
                                label="Duration" />
                            
                            <b style={{ fontSize: "125%", paddingLeft: "6px", color: `var(--${props.theme})`}} className="name" key={`${exercise.name} calsBurnt ${index}`}>Calories Burnt:</b>
                            <Field
                                type="number" name={`exercises[${index}].burntCals`} component={renderField}
                                label="Calories Burnt" />


                            <Button variant={`outline-${props.theme}`} type="button" onClick={async () => {
                                let changedExercise = {
                                    eid: props.exerciseList[index].eid,
                                    name: props.addFormValues.exercises[index].name,
                                    duration: props.addFormValues.exercises[index].duration,
                                    reps: props.addFormValues.exercises[index].reps,
                                    sets: props.addFormValues.exercises[index].sets,
                                    burntCals: props.addFormValues.exercises[index].burntCals
                                }

                                // Change values to the new selected ones
                                props.exerciseList[index] = changedExercise;

                                await changeExisting(props.exerciseList[index], props.addExercise);

                                // Forcing component to re-render when changes are made
                                forceUpdate()
                            }}>Save</Button>

                        </Tab>
                    ))
                }

                <Tab eventKey="divider" title="  " disabled></Tab>
                
                <Tab eventKey="" id="header" title="Add">
                    <b style={{ fontSize: "125%", paddingLeft: "6px", color: `var(--${props.theme})`}} className="name" >Name:</b>
                    <Field
                        type="text" name="addName" component={renderField}
                        label="Name" />

                    <b style={{ fontSize: "125%", paddingLeft: "6px", color: `var(--${props.theme})`}} className="name" >Reps:</b>
                    <Field
                        type="number" name="addReps" component={renderField}
                        label="Reps" />

                    <b style={{ fontSize: "125%", paddingLeft: "6px", color: `var(--${props.theme})`}} className="name">Sets:</b>
                    <Field
                        type="number" name="addSets" component={renderField}
                        label="Sets" />

                    <b style={{ fontSize: "125%", paddingLeft: "6px", color: `var(--${props.theme})`}} className="name">Duration:</b>
                    <Field
                        type="number" name="addDuration" component={renderField}
                        label="Duration" />

                    <b style={{ fontSize: "125%", paddingLeft: "6px", color: `var(--${props.theme})`}} className="name">Calories Burnt:</b>
                    <Field
                        type="number" name="addCalsBurnt" component={renderField}
                        label="Calories Burnt" />

                    <Button variant={`outline-${props.theme}`} type="button" onClick={async () => {
                        props.exerciseList.push({
                            name: props.addFormValues.addName,
                            reps: props.addFormValues.addReps,
                            sets: props.addFormValues.addSets,
                            duration: props.addFormValues.addDuration,
                            burntCals: props.addFormValues.addCalsBurnt
                        })

                        await submitNewExercise(props.exerciseList, props.addExercise)

                        // Get the current/initial values
                        let name = store.getState().form.EditForm.values.name
                        let description = store.getState().form.EditForm.values.description

                        props.reset()

                        // Change the form values 
                        change("name", name)
                        change("description", description)

                        return props.exerciseList;

                     }}>Add</Button>

                </Tab>
            </Tabs>
            
            <Button type="button" variant={`outline-${props.theme}`}>Back</Button>
            <Button variant={`outline-${props.theme}`} type="submit">Save</Button>
            
        </Form>
    );
    
};

let submitNewExercise = (exercises, helper) => {
    exercises.map((exercise) => {
        helper(exercise.eid, exercise.name, exercise.reps, exercise.sets, exercise.duration, exercise.burntCals);
        return exercise;
    });
}

let changeExisting = (exercise, helper) => {
    helper(exercise.eid, exercise.name, exercise.reps, exercise.sets, exercise.duration, exercise.burntCals);
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div className="field">
        <input {...input} className="form-control" placeholder={label} type={type} style={{ width: "90%" }} id="custom-field" />

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
    const config = {
        headers: {"Content-type": "multipart/form-data;"}
    }; 
    
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
        }),

        uploadImage: (imageParam) => dispatch({
            type: "UPDATE_IMAGE_UPLOAD", payload:
                axios.put(
                    `http://localhost:8080/api/v1/workout/image/update/${store.getState().workout.currentWid}/`,
                    imageParam,
                    config
                )
        })
    }
};

EditForm = reduxForm({
    form: "EditForm",
    enableReinitialize: true
})(EditForm);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditForm, submitNewExercise));
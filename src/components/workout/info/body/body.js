import React, {  } from "react";
import { store } from "../../../../redux/store.js";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Tab, Tabs } from "react-bootstrap";
import { getFormValues } from "redux-form";
import EditForm from "./editorForm/editWorkoutForm";
import axios from "axios";
import "./body.css";

class Body extends React.Component {
    constructor(props) { 
        super(props);
        
        this.state = {
            isEditing: false
        }
    }
    
    onClick(boolean) { 
        this.setState({
            isEditing: boolean
        })
    }

    onSubmit = async values => { 
        let wid = this.props.selectedWorkout.wid;
        let name = this.props.formValues.name;
        let description = this.props.formValues.description;

        await this.props.submitExistingSavedWorkout(wid, name, description);
        this.exerciseSubmit.bind(this)
    }

    exerciseSubmit = async values => { 
        await this.props.submitExistingSavedWorkoutExercise();
    }

    onItemClick(e) { 
        e.preventDefault();
    }

    render() {
        while (this.state.isEditing === true) { 
            return (
                <div>
                    <EditForm onSubmit={this.onSubmit} exerciseList={this.props.selectedWorkout.exerciseList}
                    initialValues={{
                        name: this.props.selectedWorkout.name,
                        description: this.props.selectedWorkout.description,
                        exercises: this.props.selectedWorkout.exerciseList
                    }} />
                </div>
            );
        }

        if (this.state.isEditing === false) {
            return (
                <div className="body">
                    <h1 id="header">{this.props.selectedWorkout.name}</h1>

                    <p className="name"><b>Name:</b> {this.props.selectedWorkout.name}</p>
                    <p className="name"><b>Description:</b> {this.props.selectedWorkout.description}</p>
                    <p className="name"><b>Duration:</b> {this.props.selectedWorkout.duration}</p>

                    <Tabs defaultActiveKey={0} style={{margin: "22.5px"}}>
                        {
                            this.props.selectedWorkout.exerciseList.map((exercise, index) => (
                                <Tab eventKey={`${exercise.name} ${index} ${exercise.eid}`} key={index} id="header" title={exercise.name}>
                                    <p style={{fontSize: "125%", paddingLeft: "6px"}} className="name" key={`${exercise.name} reps ${index}`}><b>Reps:</b> {exercise.reps}</p>
                                    <p style={{fontSize: "125%", paddingLeft: "6px"}} className="name" key={`${exercise.name} sets ${index}`}><b>Sets:</b> {exercise.sets}</p>
                                    <p style={{fontSize: "125%", paddingLeft: "6px"}} className="name" key={`${exercise.name} duration ${index}`}><b>Duration:</b> {exercise.duration} minutes</p>
                                    <p style={{fontSize: "125%", paddingLeft: "6px"}} className="name" key={`${exercise.name} calsBurnt ${index}`}><b>Calories Burnt:</b> {exercise.burntCals}</p>
                                </Tab>
                            ))
                        }
                    </Tabs>

                    <Button variant="outline-primary" onClick={this.onClick.bind(this, true)} className="edit-btn">Edit</Button>
                </div>
            );
        }
    }
}


const mapStateToProps = (state) => {
    const selector = getFormValues("EditForm")
    const allWorkouts = store.getState().workout.allWorkouts;
    const currentWid = store.getState().workout.currentWid;
    const index = allWorkouts.findIndex(x => x.wid === currentWid);
    
    return {
        selectedWorkout: allWorkouts[index],
        formValues: selector(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        submitExistingSavedWorkout: (wid, name, description) => dispatch({
            type: "WORKOUT_ALTER", payload:
                axios.put(
                    `http://localhost:8080/api/v1/workout/update/?access_token=${store.getState().user.accessToken}`,
                    {
                        "wid": wid,
                        "name": name,
                        "exerciseList": [],
                        "description": description,
                        "user": {
                            "uid": store.getState().user.uid
                        }
                    }
                )
        }),

        userWorkoutsGet: async (url) => dispatch({
            type: "GET_WORKOUT", payload:
              await axios.get(url)
        }),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Body))
import React, {  } from "react";
import { store } from "../../../../redux/store.js";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Tab, Tabs } from "react-bootstrap";
import { getFormValues } from "redux-form";
import EditForm from "./editorForm/editWorkoutForm";
import ConfirmDeleteModal from "./modal/deleteModal.js";
import axios from "axios";
import "./body.css";
import Loading from "./../../../loading/loading.js";

class Body extends React.Component {
    constructor(props) { 
        super(props);
        
        this.state = {
            isEditing: false,
            show: false
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

    componentDidMount() { 
        this.props.userWorkoutsGet("http://localhost:8080/api/v1/user/username/by/" + store.getState().user.user + "/?access_token=" + store.getState().user.accessToken);
    }

    onItemClick(e) { 
        e.preventDefault();
    }

    render() {
        document.documentElement.style.setProperty("--custom", `var(--${this.props.theme})`);

        while (this.state.isEditing === true) { 
            return (
                <div>
                    <EditForm image={this.props.image} onSubmit={this.onSubmit} exerciseList={this.props.selectedWorkout.exerciseList}
                        initialValues={{
                            name: this.props.selectedWorkout.name,
                            description: this.props.selectedWorkout.description,
                            exercises: this.props.selectedWorkout.exerciseList
                        }} theme={this.props.theme} variant={this.props.theme} />
                </div>
            );
        }

        if (this.state.isEditing === false) {
            if (store.getState().workout.allWorkouts.length > 0) {
                return (
                    <div className="body">
                        <div className="top" style={{ height: "max-content", overflow: "hidden" }}>
                            <div className="metadata" style={{ width: "40%", float: "left" }}>
                                <h1 id="header" style={{ color: `var(--${this.props.theme})` }}>{this.props.selectedWorkout.name}</h1>
                                <p className="name" style={{ color: `var(--${this.props.theme})` }}><b>Name:</b> {this.props.selectedWorkout.name}</p>
                                <p className="name" style={{ color: `var(--${this.props.theme})` }}><b>Description:</b> {this.props.selectedWorkout.description}</p>
                                <p className="name" style={{ color: `var(--${this.props.theme})` }}><b>Duration:</b> {this.props.selectedWorkout.duration}</p>
                            </div>

                            <div className="image-area" style={{ width: "45%", float: "right", margin: "1.5vw" }}>
                                <img style={{ width: "110%" }} alt="none" src={`data:image/jpeg;base64,${this.props.image}`} />
                            </div>
                        </div>

                        <Tabs defaultActiveKey={0} style={{ margin: "22.5px" }}>
                            {
                                this.props.selectedWorkout.exerciseList.map((exercise, index) => (
                                    <Tab eventKey={`${exercise.name} ${index} ${exercise.eid}`} key={index} id="header" title={exercise.name}>
                                        <p style={{ fontSize: "125%", paddingLeft: "6px", color: `var(--${this.props.theme})` }} className="name" key={`${exercise.name} reps ${index}`}><b>Reps:</b> {exercise.reps}</p>
                                        <p style={{ fontSize: "125%", paddingLeft: "6px", color: `var(--${this.props.theme})` }} className="name" key={`${exercise.name} sets ${index}`}><b>Sets:</b> {exercise.sets}</p>
                                        <p style={{ fontSize: "125%", paddingLeft: "6px", color: `var(--${this.props.theme})` }} className="name" key={`${exercise.name} duration ${index}`}><b>Duration:</b> {exercise.duration} minutes</p>
                                        <p style={{ fontSize: "125%", paddingLeft: "6px", color: `var(--${this.props.theme})` }} className="name" key={`${exercise.name} calsBurnt ${index}`}><b>Calories Burnt:</b> {exercise.burntCals}</p>
                                    </Tab>
                                ))
                            }
                        </Tabs>

                        <Button variant={`outline-${this.props.theme}`} onClick={this.onClick.bind(this, true)} className="edit-btn">Edit</Button>
                        <Button variant="outline-danger" className="edit-btn" style={{ marginTop: "10px" }} onClick={() => {
                            this.setState({show: true})    
                        }}>Delete Workout</Button>

                        {
                            this.state.show === true ? <ConfirmDeleteModal theme={this.props.theme} selectedVals={this.props.values}
                                showing={this.state.show} onSubmit={async () => { 
                                    // Delete workout
                                    await this.props.deleteWorkout(`http://localhost:8080/api/v1/workout/delete/by/${store.getState().workout.currentWid}/?access_token=${store.getState().user.accessToken}`);
                                    await this.props.history.push("/workouts/all/")
                                    await store.dispatch({ type: "DELETE_CURRENT_WID" })
                                    
                                    await window.location.reload()
                                }} /> : null
                        }
                    </div>
                );
            } else { 
                return <Loading />
            }
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
    const config = {
        headers: {"Authorization": "Basic NTY0aGpnNDU2dXlkc2dmc2RnZnNkdXl0ZnRyeTM3M3Y1Y2JmZjpNeVN0cm9uZ1Bhc3N3b3Jk", "Content-type": "application/json"}
    };

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
                ).then((data) => {
                    return data;
                  }).catch(async (error) => {
                    if (error.response.status === 401) {
                      // Try refresh
                      await store.dispatch({ type: "USER_TOKEN_REFRESH", payload: 
                        axios.post(
                          `http://localhost:8080/api/v1/user/login/?grant_type=refresh_token&refresh_token=${store.getState().user.refreshToken}`,
                          {}, 
                          config
                        ).then(async (data) => {
                          window.location.reload()
                          return data;
                        }).catch(async (error) => { 
                            await store.dispatch({ type: "USER_LOGOUT" });
                            await this.props.history.push("/")
                            window.location.reload()
                            return error;
                        })
                      })
                    }
                  })
        }),

        userWorkoutsGet: (url) => dispatch({
            type: "GET_WORKOUT", payload:
                axios.get(url).then((data) => {
                    return data;
                }).catch(async (error) => {
                    if (error.response.status === 401) {
                        // Try refresh
                        await store.dispatch({ type: "USER_TOKEN_REFRESH", payload: 
                            axios.post(
                            `http://localhost:8080/api/v1/user/login/?grant_type=refresh_token&refresh_token=${store.getState().user.refreshToken}`,
                            {}, 
                            config
                            ).then(async (data) => {
                            return data;
                            }).catch(async (error) => { 
                                await store.dispatch({ type: "USER_LOGOUT" });
                                await this.props.history.push("/")
                                window.location.reload()
                                Promise.reject()
                            })
                        })
                    }
              })
        }),

        deleteWorkout: (url) => dispatch({
            type: "REMOVE_WORKOUT", payload:
                axios.delete(url).then((data) => {
                    return data;
                }).catch(async (error) => {
                    if (error.response.status === 401) {
                        // Try refresh
                        await store.dispatch({ type: "USER_TOKEN_REFRESH", payload: 
                            axios.post(
                            `http://localhost:8080/api/v1/user/login/?grant_type=refresh_token&refresh_token=${store.getState().user.refreshToken}`,
                            {}, 
                            config
                            ).then(async (data) => {
                            return data;
                            }).catch(async (error) => { 
                                await store.dispatch({ type: "USER_LOGOUT" });
                                await this.props.history.push("/")
                                window.location.reload()
                                Promise.reject()
                            })
                        })
                    }
              })
        })
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Body))
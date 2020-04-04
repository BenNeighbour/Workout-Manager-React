import React, { Component } from 'react';
import "./todoList.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TodoList from "./todoList.js";
import { store } from '../../../../../redux/store';
import { Button } from "react-bootstrap";
import { reduxForm, getFormValues } from "redux-form";
import AddTodoModal from "./todoPopover/addPopover.js";
import axios from 'axios';

class Content extends Component {
    constructor(props) { 
        super(props);

        this.state = {
            show: false,
            arr: [],
            submitted: false
        }
    }

    componentDidMount() {
        store.getState().todo.todoList.map(async (todo, index) => {
            await this.setChecked(todo.workout.name, todo.completed)
        });
        this.props.getWorkouts("http://localhost:8080/api/v1/user/username/by/" + store.getState().user.user + "/?access_token=" + store.getState().user.accessToken)
    }

    render() {
        let current = new Date();
        let today = current.toLocaleDateString('en-US', { weekday: 'long' });

        return (
            <div style={{ marginLeft: "5vw", display: "inline-block", height: "fit-content" }}>
                <h2 className="welcome" style={{ color: `var(--${this.props.theme})`, fontSize: "190%", marginLeft: "0", marginTop: "0", padding: "0", paddingBottom: "1.5vh" }}>Your Workouts for {today}</h2>
                <div style={{paddingLeft: "1.3vw"}}>
                    {
                        store.getState().todo.todoList.map((todo, index) => (
                            <TodoList key={`${todo}-${index}`} workout={todo.workout} todo={todo} style={{display: "inline-block" , whiteSpace: "nowrap"}} theme={this.props.theme} variant={this.props.variant} />
                        ))
                    }
                </div>

                <Button style={{ marginLeft: "3.4vw", marginTop: "0.7vh", marginBottom: "0.7vh" }} onClick={() => { 
                    this.setState({show: true})
                }} variant={`outline-${this.props.theme}`}>Add</Button>

                <br />

                <Button style={{ marginLeft: "3.4vw", marginTop: "0.7vh", marginBottom: "0.7vh" }} onClick={async () => { 

                    // Iterate through the todo list
                    let state = this.state.arr
                    
                    store.getState().todo.todoList.map(async (todo, index) => {
                        // Append each one to array inside component state
                        await this.isChecked(todo.workout.name);

                        // Submitting to the API endpoint
                        await this.props.saveTodos(store.getState().user.uid, store.getState().user.user, todo.workout.wid, todo, state[index][todo.workout.name]);

                        // Reload the page
                        window.location.reload()
                    });

                    this.setState({ arr: [] });
                }} variant={`outline-${this.props.theme}`}>Save</Button>

                {                
                    this.state.show === true ? <AddTodoModal onSubmit={async () => {
                        let workout = ""
                        // Get the corresponding wid of the workout name
                        if (this.props.addFormValues.workout !== undefined) {
                            workout = this.props.addFormValues.workout
                            store.getState().workout.allWorkouts.map((todo) => {
                                if (todo.name === workout) {
                                    workout = todo.wid
                                }

                                return workout
                            });
                        }

                        let day = this.props.addFormValues.day
                        let description = this.props.addFormValues.description

                        await this.props.addTodo(`http://localhost:8080/api/v1/user/todos/${store.getState().user.uid}/${store.getState().user.user}/${day}/save/`,
                            workout, description)
                        
                        if (store.getState().todo.error === 200) {
                            window.location.reload()
                        }
                    }} theme={this.props.theme} selectedVals={this.props.values} showing={this.state.show} /> : null
                }

            </div>
        );
    }

    isChecked(todo) {
        let isChecked = document.getElementById(`input-check-${todo}`)
        this.setState({ arr: this.state.arr.push({[todo]: isChecked.checked}) })
    }

    setChecked(todo, checkedBool) {
        document.getElementById(`input-check-${todo}`).checked = checkedBool
    }
}   

const mapStateToProps = (state) => {
    const selector = getFormValues("AddTodoForm")
    return {
        addFormValues: selector(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    const config = {
        headers: {"Authorization": "Basic NTY0aGpnNDU2dXlkc2dmc2RnZnNkdXl0ZnRyeTM3M3Y1Y2JmZjpNeVN0cm9uZ1Bhc3N3b3Jk", "Content-type": "application/json"}
    };

    return {
        addTodo: (url, wid, description) => dispatch({ 
            type: "ADD_TODO", payload:
                axios.post(
                    `${url}?access_token=${store.getState().user.accessToken}`,
                    {
                        "description": description,
                        "workout": {
                            "wid": wid
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
                            })
                        })
                    } else if (error.response.status === 400) {
                        return error;
                    }
                })
        })
    };
};

Content = reduxForm({
    form: 'TodoList',
    enableReinitialize: true
})(Content)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Content));
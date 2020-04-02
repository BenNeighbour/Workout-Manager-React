import React, { Component } from 'react';
import "./todoList.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TodoList from "./todoList.js";
import { store } from '../../../../../redux/store';
import { Button } from "react-bootstrap";
import { reduxForm } from "redux-form";
import AddTodoModal from "./todoPopover/addPopover.js";

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
                            <TodoList key={`${todo}-${index}`} workout={todo.workout} style={{display: "inline-block" , whiteSpace: "nowrap"}} theme={this.props.theme} variant={this.props.variant} />
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
                    this.state.show === true ? <AddTodoModal onSubmit={() => {

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
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

Content = reduxForm({
    form: 'TodoList',
    enableReinitialize: true
})(Content)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Content));
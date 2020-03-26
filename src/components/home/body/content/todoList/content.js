import React, { Component } from 'react';
import "./todoList.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TodoList from "./todoList.js";
import { store } from '../../../../../redux/store';

class Content extends Component {
    render() {
        let current = new Date();
        let today = current.toLocaleDateString('en-US', { weekday: 'long' });
        return (
            <div style={{ marginLeft: "5vw", display: "inline-block" }}>
                <h2 className="welcome" style={{ color: `var(--${this.props.theme})`, fontSize: "190%", marginLeft: "0", marginTop: "0", padding: "0", paddingBottom: "1.5vh" }}>Your Workouts for {today}</h2>
                <div style={{paddingLeft: "1.3vw"}}>
                    {
                        store.getState().todo.todoList.map((todo, index) => (
                            <TodoList key={`${todo}-${index}`} workout={todo.workout} style={{display: "inline-block" , whiteSpace: "nowrap"}} theme={this.props.theme} variant={this.props.variant} />
                        ))
                    }
                </div>
            </div>
        );
    }
}   

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Content));
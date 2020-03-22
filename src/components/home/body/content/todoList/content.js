import React, { Component } from 'react';
import "./todoList.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TodoList from "./todoList.js";
import { store } from '../../../../../redux/store';

class Content extends Component { 
    render() {
        return (
            <div style={{marginLeft: "3.5vw"}}>
                {
                    store.getState().todo.todoList.map((todo, index) => (
                        <TodoList key={`${todo}-${index}`} text={todo.description} theme={this.props.theme} variant={this.props.variant} />
                    ))
                }
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
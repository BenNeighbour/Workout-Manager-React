import React, { Component } from 'react';
import "./todoList.css";
import { withRouter } from "react-router-dom";
import TodoItemPopover from "./todoPopover/popover.js";

class TodoList extends Component {
  render() {
    document.documentElement.style.setProperty("--custom", `var(--${this.props.theme})`);

    return (
      <div style={{ width: "90vw", height: "fit-content", display: "inline-block", overflow: "hidden", minHeight: "0vh" }}>
        <label className="todo-container">
          <p style={{paddingRight: "10px"}}>{this.props.workout.name}</p>
          <div className="todo">
            <input type="checkbox" />
            <span className="checkmark"></span>
          </div>
        </label>
        <TodoItemPopover title={this.props.workout} />
      </div>
    );
  }
}   

export default withRouter(TodoList);
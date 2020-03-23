import React, { Component } from 'react';
import "./todoList.css";
import { withRouter } from "react-router-dom";
import { Button } from 'react-bootstrap';
import TodoItemPopover from "./todoPopover/popover.js";

class TodoList extends Component {
  render() {
    document.documentElement.style.setProperty("--custom", `var(--${this.props.theme})`);

    return (
      <div style={{ width: "fit-content", height: "5vh", overflow: "hidden" }}>
        <label className="todo-container">
          <p style={{paddingRight: "10px"}}>{this.props.text}</p>
          <div className="todo">
            <input type="checkbox" />
            <span className="checkmark"></span>
          </div>  
        </label>
        <Button className="button2" style={{ position: "absolute" }} onClick={() => { 
          // Render popover
          return <TodoItemPopover />
        }}>click</Button>
        
      </div>
    );
  }
}   

export default withRouter(TodoList);
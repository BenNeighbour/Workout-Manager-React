import React, { Component } from 'react';
import "./todoList.css";
import { withRouter } from "react-router-dom";

class TodoList extends Component { 
  render() {
    document.documentElement.style.setProperty("--custom", `var(--${this.props.theme})`);
    
    return (
      <div style={{width: "fit-content", height: "fit-content", padding: "0.3em"}}>
        <label className="todo-container">
          <p>{this.props.text}</p>
            <div className="todo">
              <input type="checkbox" />
              <span className="checkmark"></span>
            </div>
        </label>
      </div>
    );
  }
}   

export default withRouter(TodoList);
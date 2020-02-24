import React, { Component } from 'react';
import "./page.css";
import Navigation from "../home/nav/nav.js";
import Body from "./body/body.js";
import { Card } from "react-bootstrap";
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import { Button } from '@material-ui/core';

export default class WorkoutsPage extends Component {
  redirect(page) { 
    this.props.history.push(`${page}`)
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <h1 id="header">Your Workouts</h1>
        <Body />
        <Card className="workoutCard">
          <Card.Body className="add-card">
            <Button onClick={this.redirect.bind(this, "/workouts/add/")} className="add-card-btn">
              <AddBoxOutlinedIcon />
            </Button> 
          </Card.Body>
        </Card>
      </div>
    );
  }
}

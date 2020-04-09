import React, { Component } from 'react';
import { store } from "../../../redux/store.js";
import Body from "./body/body.js";
import { withRouter } from "react-router-dom";
import Navigation from "../../home/nav/nav.js";

import { connect } from "react-redux";
import Loading from '../../loading/loading.js';

class WorkoutPage extends Component { 
    render() {
        if (this.props.location.state.image !== undefined) {
            if (this.props.theme !== null) {
                return (
                    <div>
                        <Navigation theme={this.props.theme} variant={this.props.variant} />
                        <Body image={this.props.location.state.image} id={this.props.currentWorkoutId} theme={this.props.theme} variant={this.props.variant} />
                    </div>
                );
            } else {
                return <Loading />
            }
        } else { 
            return this.props.history.push("/workouts/")
        }
    }
}

const mapStateToProps = (state) => {
    return {
        currentWorkoutId: store.getState().workout.currentWid
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkoutPage));
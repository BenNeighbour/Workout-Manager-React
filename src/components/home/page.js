import React, { Component } from 'react';
import Body from "./body/body.js";
import Navigation from "./nav/nav.js";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import Loading from '../loading/loading.js';
import { store } from "./../../redux/store.js";
import axios from "axios";

class Page extends Component {
  constructor(props) { 
    super(props);

    this.state = {
      isLoading: true
    }
  }

  getProperties = async () => {
    await this.props.getTodos(store.getState().user.uid, store.getState().user.user);
    this.setState({
      isLoading: false
    });
  }

  componentDidMount() {
    this.getProperties()
  }

  render() {
    if (this.props.theme !== null && !this.state.isLoading) {
      return (
        <div className="App">
          <Navigation theme={this.props.theme} variant={this.props.variant} />
          <Body theme={this.props.theme} variant={this.props.variant} />
        </div>
      );
    } else { 
      return <Loading message="Logging In..." />
    }
  }
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  let current = new Date();
  let today = current.toLocaleDateString('en-US', { weekday: 'long' });

  return {
    getTodos: (uid, username) => dispatch({
      type: "GET_TODOS", payload: 
        axios.get(
            `http://localhost:8080/api/v1/user/todos/${uid}/${username}/${today}/?access_token=${store.getState().user.accessToken}`
        )
    })
  }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Page));
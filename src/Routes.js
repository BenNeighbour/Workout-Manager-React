import React from 'react';
import Page from "./components/home/page.js";
import Login from "./components/login/loginView.js";
import WorkoutPage from "./components/workout/info/workoutInfoPage.js";
import ChangePasswordPage from "./components/changePassword/body/page.js";
import LandingPage from "./components/landingPage.js";
import NotFound from "./components/error/404.js";
import WorkoutsPage from "./components/workouts/page.js";
import AddWorkoutsPage from "./components/addWorkout/addWorkout.js";
import PrivateRoute from "./routeTypes/PrivateRoute";
import GatewayRoute from "./routeTypes/GatewayRoute";
import Signup from "./components/signup/signupView.js";
import ProfileSettingsPage from "./components/settings/profileSettings.js";
import { Switch, Route } from 'react-router-dom';
import { store } from "./redux/store.js";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

class Routes extends React.Component {

  sessionRefresh = () => {
    const url = `http://localhost:8080/oauth/token?grant_type=refresh_token&refresh_token=${store.getState().user.refreshToken}`
  
    setInterval(() =>
      this.intervalHelper(url),
      300 * 1000
    )
  }

  intervalHelper = async (url) => { 
    await this.props.userRefresh(url);
  }

  componentDidMount() { 
    const error = store.getState().user.error;
    
    if (store.getState().user.refreshToken === null || error !== 200) { 
      if (error === "Invalid refresh token") {
        store.dispatch({ type: "USER_LOGOUT" })
      }
    }
    if (store.getState().user.isAuthenticated === true) {
      this.sessionRefresh();
    }
  }

  render() {
    let theme;
    let variant = "dark";
    let number = store.getState().user.theme_id

    switch (number) { 
        case (1): { 
          theme = "primary"
          break;
        }
        case (2): { 
          theme = "secondary"
          break;
        }
        case (3): { 
          theme = "danger"
          break;
        }
        case (4): { 
          theme = "success"
          break;
        }
        case (5): { 
          theme = "warning"
          break;
        }
        case (6): { 
          theme = "info"
          break;
        }
        case (7): { 
          variant = "light"
          theme = "light"
          break;
        }
        case (8): { 
          variant = "dark"
          theme = "dark"
          break;
        }
        
        default: { 
          theme = "primary"
          break;
        }
    }

    if (number > 8) { 
      store.dispatch({ type: "THEME_CHANGE", payload: 1 })
    }


    return (
      <div className="App">
        <Route>
          <Switch>
            <PrivateRoute exact path='/home' component={Page} theme={theme} variant={variant} />
            <PrivateRoute exact path='/workouts/add' component={AddWorkoutsPage} theme={theme} variant={variant} />
            <PrivateRoute exact path='/workouts/all' component={WorkoutsPage} theme={theme} variant={variant} />
            <PrivateRoute exact path='/workout/info' component={WorkoutPage} theme={theme} variant={variant} />
            <PrivateRoute exact path='/profile/settings' component={ProfileSettingsPage} theme={theme} variant={variant} />
            <GatewayRoute exact path="/login" component={Login} />
            <Route exact path="/changepassword" component={ChangePasswordPage} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/" component={LandingPage} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Route>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  const config = {
    headers: {"Authorization": "Basic NTY0aGpnNDU2dXlkc2dmc2RnZnNkdXl0ZnRyeTM3M3Y1Y2JmZjpNeVN0cm9uZ1Bhc3N3b3Jk"}
  }; 

  return {
    userRefresh: (url) => dispatch({
      type: "USER_TOKEN_REFRESH", payload:
      axios.post(url, {}, config)
    }),
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));
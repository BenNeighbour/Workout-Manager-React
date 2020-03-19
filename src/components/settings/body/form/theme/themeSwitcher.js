import React, { Component } from 'react'; 
import { Button } from 'react-bootstrap';
import { store } from '../../../../../redux/store';
import { connect } from "react-redux";
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm, getFormValues } from "redux-form";

class ThemeSwitcher extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <form className="App">
                <div className="form-check form-check">
                    <label className="form-check-label"><Field className="form-check-input" component="input" type="radio" name="option1" value="1" />
                    Blue</label>

                    <br />
                    <label className="form-check-label"><Field className="form-check-input" component="input" type="radio" name="option1" value="2" />
                    Grey</label>

                    <br />
                    <label className="form-check-label"><Field className="form-check-input" component="input" type="radio" name="option1" value="3" />
                    Red</label>

                    <br />
                    <label className="form-check-label"><Field className="form-check-input" component="input" type="radio" name="option1" value="4" />
                    Green</label>

                    <br />
                    <label className="form-check-label"><Field className="form-check-input" component="input" type="radio" name="option1" value="5" />
                    Yellow</label>

                    <br />
                    <label className="form-check-label"><Field className="form-check-input" component="input" type="radio" name="option1" value="6" />
                    Cyan</label>

                    <br />
                    <label className="form-check-label"><Field className="form-check-input" component="input" type="radio" name="option1" value="7" />
                    Light</label>

                    <br />
                    <label className="form-check-label"><Field className="form-check-input" component="input" type="radio" name="option1" value="8" />
                    Dark</label>

                </div>

                <Button variant={`outline-${this.props.theme}`} onClick={async () => {
                    await this.props.changeTheme("http://localhost:8080/api/v1/user/settings/theme/" + store.getState().user.uid + "/" + store.getState().user.user + "/" + this.props.option.option1)
                    store.dispatch({ type: "USER_LOGOUT" })
                    this.props.history.push("/login/")
                }}>Change</Button>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    const selector = getFormValues("ThemeSwitcherForm")
    return {
        option: selector(state)
    }
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        changeTheme: (url) => dispatch({
            type: "THEME_CHANGE", payload:
                axios.post(
                    url
                )
        })
    }
};

ThemeSwitcher = reduxForm({
    form: 'ThemeSwitcherForm'
})(ThemeSwitcher)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ThemeSwitcher));
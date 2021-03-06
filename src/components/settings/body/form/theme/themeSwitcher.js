import React, { Component } from 'react'; 
import { Button } from 'react-bootstrap';
import { store } from '../../../../../redux/store';
import { connect } from "react-redux";
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm, getFormValues } from "redux-form";
import "./checkbox.css";

class ThemeSwitcher extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <form className="App">
                <h1 className="welcome" style={{ fontSize: "225%", marginTop: "0px", paddingTop: "0px", marginLeft: "0", color: `var(--${this.props.theme})` }}>Your Theme</h1>

                <div className="form-check form-check">
                    <label className="form-check-label" id="option-container"><Field className="form-check-input" component="input" type="radio" name="option1" value="1" />
                        Blue
                    <span className="checkmark"></span>
                    </label>

                    <br />
                    <label className="form-check-label" id="option-container"><Field className="form-check-input" component="input" type="radio" name="option1" value="2" />
                        Grey
                    <span className="checkmark"></span>
                    </label>

                    <br />
                    <label className="form-check-label" id="option-container"><Field className="form-check-input" component="input" type="radio" name="option1" value="3" />
                        Red
                    <span className="checkmark"></span>
                    </label>

                    <br />
                    <label className="form-check-label" id="option-container"><Field className="form-check-input" component="input" type="radio" name="option1" value="4" />
                        Green
                    <span className="checkmark"></span>
                    </label>

                    <br />
                    <label className="form-check-label" id="option-container"><Field className="form-check-input" component="input" type="radio" name="option1" value="5" />
                        Yellow
                    <span className="checkmark"></span>
                    </label>

                    <br />
                    <label className="form-check-label" id="option-container"><Field className="form-check-input" component="input" type="radio" name="option1" value="6" />
                        Cyan
                    <span className="checkmark"></span>
                    </label>

                    <br />
                    <label className="form-check-label" id="option-container"><Field className="form-check-input" component="input" type="radio" name="option1" value="7" />
                        Dark
                    <span className="checkmark"></span>
                    </label>

                </div>

                <Button variant={`outline-${this.props.theme}`} onClick={async () => {
                    await this.props.changeTheme("http://localhost:8080/api/v1/user/settings/theme/" + store.getState().user.uid + "/" + store.getState().user.user + "/" + this.props.option.option1)
                    await store.dispatch({ type: "USER_LOGOUT" })
                    await this.props.history.push("/")
                    await window.location.reload()
                }} style={{margin: "4vh"}}>Change</Button>
                
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
    const config = {
        headers: {"Authorization": "Basic NTY0aGpnNDU2dXlkc2dmc2RnZnNkdXl0ZnRyeTM3M3Y1Y2JmZjpNeVN0cm9uZ1Bhc3N3b3Jk", "Content-type": "application/json"}
    };
    
    return {
        changeTheme: (url) => dispatch({
            type: "THEME_CHANGE", payload:
                axios.post(
                    url
                ).then((data) => {
                    return data;
                    }).catch(async (error) => {
                    if (error.response.status === 401) {
                        // Try refresh
                        await store.dispatch({ type: "USER_TOKEN_REFRESH", payload: 
                        axios.post(
                            `http://localhost:8080/api/v1/user/login/?grant_type=refresh_token&refresh_token=${store.getState().user.refreshToken}`,
                            {}, 
                            config
                        ).then(async (data) => {
                            window.location.reload()
                            return data;
                        }).catch(async (error) => { 
                            await store.dispatch({ type: "USER_LOGOUT" });
                            await this.props.history.push("/")
                            window.location.reload()
                        })
                    })
                }
            })
        })
    }
};

ThemeSwitcher = reduxForm({
    form: 'ThemeSwitcherForm',
    enableReinitialize: true
})(ThemeSwitcher)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ThemeSwitcher));
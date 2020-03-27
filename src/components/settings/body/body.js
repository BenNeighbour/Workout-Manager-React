import React from 'react';
import { withRouter } from 'react-router-dom';
import { ListGroup, Tab, Col, Row } from "react-bootstrap";
import { getFormValues } from "redux-form";
import { connect } from "react-redux";
import axios from "axios";
import AccountInfoForm from "./form/accountInfoForm.js";
import { store } from '../../../redux/store.js';
import ThemeSwitcher from './form/theme/themeSwitcher.js';

class Body extends React.Component {

    submit = async values => { 

        // Extracting form values
        let newUsername = this.props.newCredentials.updateUsername;
        let newEmail = this.props.newCredentials.updateEmail;
        let verifiedPassword = this.props.password;

        const config = {
            headers: {"Authorization": `Bearer ${store.getState().user.accessToken}`}
        }; 

        // Make axios user alter request
        await axios.put(
            `http://localhost:8080/api/v1/user/update/${verifiedPassword.verifyPassword}`,
            {
                "uid": store.getState().user.uid,
                "username": newUsername,
                "email": newEmail
            },
            config
        );

        this.props.history.push("/login");
        store.dispatch({type: "USER_LOGOUT"});
    }

    render() {
        return (
            <div className="App">
                <h1 className="welcome" style={{color: `var(--${this.props.theme})`}}>Profile Settings</h1>

                <Tab.Container id="list-group-tabs-example" defaultActiveKey="#accountInfo">
                    <Row>
                        <Col sm={4}>
                            <ListGroup style={{margin: "3vw", width: "94%"}}>
                                <ListGroup.Item action href="#accountInfo" variant={`${this.props.theme}`}>
                                    Account Info
                                </ListGroup.Item>
                                <ListGroup.Item action href="#themes" variant={`${this.props.theme}`}>
                                    Themes
                                </ListGroup.Item>
                                <ListGroup.Item action href="#other" variant={`${this.props.theme}`}>
                                    Other
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col sm={8}>
                            <Tab.Content style={{margin: "3vw"}}>
                                <Tab.Pane eventKey="#accountInfo">
                                    <AccountInfoForm initialValues={{
                                        updateUsername: store.getState().user.user,
                                        updateEmail: store.getState().user.email
                                    }} onSubmit={() => {
                                        this.submit()
                                    }} theme={this.props.theme} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="#themes">
                                    <ThemeSwitcher theme={this.props.theme} />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                    
                </Tab.Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const selector = getFormValues("AccountInfoForm")
    const passwordSelector = getFormValues("VerifyChangesForm")

    return {
        newCredentials: selector(state),
        password: passwordSelector(state)
    }
};

export default withRouter(connect(mapStateToProps, null)(Body));
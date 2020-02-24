import React from 'react';
import { withRouter } from 'react-router-dom';
import Nav from "./../home/nav/nav.js";
import Body from "./body/body.js";

class ProfileSettingsPage extends React.Component {
    render() {
        return (
            <div>
                <Nav />
                <Body />
            </div>
        );
    }
}

export default withRouter(ProfileSettingsPage);
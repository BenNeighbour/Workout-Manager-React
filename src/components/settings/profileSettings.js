import React from 'react';
import { withRouter } from 'react-router-dom';
import Nav from "./../home/nav/nav.js";
import Body from "./body/body.js";

class ProfileSettingsPage extends React.Component {
    render() {
        return (
            <div>
                <Nav theme={this.props.theme} variant={this.props.variant} />
                <Body theme={this.props.theme} variant={this.props.variant} />
            </div>
        );
    }
}

export default withRouter(ProfileSettingsPage);
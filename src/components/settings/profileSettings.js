import React from 'react';
import { withRouter } from 'react-router-dom';
import Nav from "./../home/nav/nav.js";
import Body from "./body/body.js";
import Loading from '../loading/loading.js';

class ProfileSettingsPage extends React.Component {
    render() {
        if (this.props.theme !== null) {
            return (
                <div>
                    <Nav theme={this.props.theme} variant={this.props.variant} />
                    <Body theme={this.props.theme} variant={this.props.variant} />
                </div>
            );
        } else { 
            return <Loading />
        }
    }
}

export default withRouter(ProfileSettingsPage);
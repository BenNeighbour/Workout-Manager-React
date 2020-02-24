import React from 'react';

import "./404.css";
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

class NotFound extends React.Component {
    onClick(route) { 
        this.props.history.push(route)
    }

    render() {
        return (
            <div className="error">
                <h1 className="code">Error 404</h1>
                <h5 className="message">Page Not Found</h5>
                <Button variant="outline-primary" onClick={this.onClick.bind(this, "/")} className="home-btn">Go to homepage</Button>
                <p className="or">---- or ----</p>
                <Button variant="outline-primary" onClick={this.onClick.bind(this, "/login")} className="login-btn">Log In</Button>
            </div>
        );
    }
}

export default withRouter(NotFound);
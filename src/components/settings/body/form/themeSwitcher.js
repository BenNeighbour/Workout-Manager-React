import React, { Component } from 'react'; 
import { Button } from 'react-bootstrap';
import { store } from '../../../../redux/store';

class ThemeSwitcher extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit} className="App">
                <Button onClick={() => {
                    store.dispatch({ type: "THEME_CHANGE", payload: store.getState().user.theme_id + 1 })
                }}>Change</Button>
            </form>
        );
    }
}

export default ThemeSwitcher;
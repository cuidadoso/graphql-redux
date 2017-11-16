/**
 * @author Alexander Pyreev
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Main extends Component {
    render() {
        return (
            <div>
                <p>hello react!</p>
            </div>
        )
    }
}

ReactDOM.render(
    <Main/>,
    document.getElementById("example")
);

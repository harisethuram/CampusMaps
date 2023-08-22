/*
 * Copyright (C) 2022 Kevin Zatloukal and James Wilcox.  All rights reserved.  Permission is
 * hereby granted to students registered for University of Washington
 * CSE 331 for use solely during Autumn Quarter 2022 for purposes of
 * the course.  No other use, copying, distribution, or modification
 * is permitted without prior written consent. Copyrights for
 * third-party components of this work must be honored.  Instructors
 * interested in reusing these course materials should contact the
 * author.
 */

import React, {Component} from 'react';

// Allows us to write CSS styles inside App.css, any styles will apply to all components inside <App />
import "./App.css";
import Map from "./Map";
import Locations from "./Locations";

interface AppState {
    start: string;
    end: string;
    key: number
}

class App extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            start: "",
            end: "",
            key: 0
        }
    }

    // for the start selection
    onSelectStart = (text: string) => {
        this.setState({start: text})
    }

    // for the end selection
    onSelectEnd = (text: string) => {
        this.setState({end: text})
    }

    // clear the map and inputs
    clear = () => {
        this.setState({start: "", end: "", key: this.state.key+1})
    }
    render() {
        return (
            <div className="App">
                <h1 id="app-title">Campus Paths</h1>
                <div>
                    <center>
                        <Map start={this.state.start} end={this.state.end} key={this.state.key}/>*
                    </center>
                </div>
                <div id="start">
                    <center>
                        <table border={5} cellPadding={10}>
                            <tr>
                                <td width={150} height={50}>
                                    <center>
                                        <Locations onSelect={this.onSelectStart} key={this.state.key}/>
                                        <p>Start</p>
                                    </center>
                                </td>

                                <td width={150} height={50}>
                                    <center>
                                        <Locations onSelect={this.onSelectEnd} key={this.state.key}/>
                                        <p>End</p>
                                    </center>
                                </td>
                            </tr>
                        </table>*
                    </center>
                </div>
                <div>
                    <center><button onClick={this.clear}>Clear</button></center>
                </div>
            </div>
        );
    }

}
//<Locations onChange={this.onChangeStart} onClear={this.onClear}/>

export default App;

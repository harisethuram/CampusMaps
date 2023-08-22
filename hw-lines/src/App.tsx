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

import React, {Component} from "react";
import ItemList from "./ItemList";
import Map from "./Map";

// Allows us to write CSS styles inside App.css, any styles will apply to all components inside <App />
import "./App.css";

import {Line} from "./Line";
import {LatLngExpression} from "leaflet";
import {UW_LATITUDE_CENTER, UW_LONGITUDE_CENTER} from "./Constants";

interface AppState {
    mapLines: Line[] | undefined;
    point: LatLngExpression | undefined;
}

// Main app and passes data between ItemList and Map
class App extends Component<{}, AppState> { // <- {} means no props.
    // set default values for state
    constructor(props: any) {
        super(props);
        this.state = {
            mapLines: undefined,
            point: undefined
        };
    }

    // render the ItemList and Map
    render() {
        return (
            <div>
                <h1 id="app-title">Line Mapper!</h1>
                <div>
                    <Map mapLines={this.state.mapLines} point={this.state.point}/>
                </div>
                {<ItemList
                    onClear={() => this.onClear()}
                    onDraw={(lines) => {
                        this.onDraw(lines)
                    }}
                />}
            </div>
        );
    }

    // update the state if the Draw button is pressed
    onDraw = (items: [Line[], LatLngExpression | undefined] | undefined) => {
        this.setState({mapLines: undefined});
        if (items === undefined)
            return;

        this.setState({mapLines: items[0]});
        //items[1][0]
        if (items[1] !== undefined)
            this.setState({point: items[1]})
        console.log("center:" + this.state.point);
    }

    // set to default if clear button is pressed
    onClear() {
        this.setState({mapLines: undefined, point: [UW_LATITUDE_CENTER, UW_LATITUDE_CENTER]});
    }

}


export default App;

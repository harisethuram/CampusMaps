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
import {MapContainer, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapLine from "./MapLine";
import {Line} from "./Line";
import {LOCS, UW_LATITUDE_CENTER, UW_LONGITUDE_CENTER, COLORS} from "./Constants";

// properties of a Map
interface MapProps {
    start: string,
    end: string
}
interface MapState {
    cost: number,
    mapLines: Line[]
}
// Class that represents the Map to be rendered and show the lines
class Map extends Component<MapProps, MapState> {
    // construct the Map
    constructor(props: MapProps) {
        super(props);
        this.state = {cost: 0, mapLines: []}
    }

    // render the map
    render() {
        return (<div>
            <div id="map">
                <MapContainer center={[UW_LATITUDE_CENTER,UW_LONGITUDE_CENTER]}
                              zoom={15}
                              scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {
                        this.setGraph()
                    }
                </MapContainer></div>
            <div>
                <div>
                    <button onClick={this.getLines}>Find Path</button>
                </div>
            </div>
        </div>);
    }

    // do all processing and generate the HTML to be rendered
    setGraph = () => {
        //this.getLines();
        let tmp: any[] = []
        if (this.state.mapLines !== []) {
            console.log("-h");
            for (let i = 0; i < this.state.mapLines.length; i++) {
                tmp.push(<MapLine x1={this.state.mapLines[i]["x1"]} y1={this.state.mapLines[i]["y1"]}
                                  x2={this.state.mapLines[i]["x2"]} y2={this.state.mapLines[i]["y2"]}
                                  color={COLORS[Math.floor(Math.random()*COLORS.length)]} key={i}/>);
            }
        }
        //console.log(tmp);
        return (tmp);
    }

    // get the lines
    getLines = async() => {
        try {
            if (LOCS.includes(this.props.start) && LOCS.includes(this.props.end)) {
                console.log("true")
                let a = "http://localhost:4567/find-path?start=" + this.props.start + "&end=" + this.props.end;
                let response = await fetch(a);
                if (!response.ok) {
                    alert("The status is wrong! Expected: 200, Was: " + response.status);
                    return;
                }
                let object = (await response.json());
                this.setState({cost: object["cost"]})
                let tmp: Line[] = [];
                let path = object["path"];
                for (let i = 0; i < path.length; i++) {
                    let line = {} as Line;
                    line["x1"] = path[i]["start"]["x"];
                    line["y1"] = path[i]["start"]["y"];
                    line["x2"] = path[i]["end"]["x"];
                    line["y2"] = path[i]["end"]["y"];
                    tmp.push(line)
                }
                this.setState({cost: object["cost"], mapLines: tmp})
                console.log(this.state.mapLines);
            }
            else {
                this.setState({cost: 0, mapLines: []})
                console.log("->" + this.state.mapLines)
            }
        } catch (e) {
            alert("There was an error contacting the server.");
            console.log(e);
        }
    }
}

export default Map;
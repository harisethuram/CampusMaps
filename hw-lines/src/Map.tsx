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

import {LatLngExpression} from "leaflet";
import React, {Component} from "react";
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapLine from "./MapLine";
import {Line} from "./Line";
import {UW_LATITUDE_CENTER, UW_LONGITUDE_CENTER} from "./Constants";

// properties of a Map
interface MapProps {
    mapLines: Line[] | undefined,
    point: LatLngExpression | undefined
}

interface MapSTate {
    center: LatLngExpression
}

// Class that represents the Map to be rendered and show the lines
class Map extends Component<MapProps, MapSTate> {
    // construct the Map
    constructor(props: MapProps) {
        super(props);
        this.state = {center: [UW_LATITUDE_CENTER, UW_LONGITUDE_CENTER]};
    }

    // render the map
    render() {
        return (<div>
            <div id="map">
                <MapContainer center={this.state.center}
                                        zoom={15}
                                        scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    this.setGraph()
                }
                {
                    this.setPoints()
                }
            </MapContainer></div>
            <div>
            </div>
        </div>);
    }

    // do all processing and generate the HTML to be rendered
    setGraph () {
        let tmp: any[] = []
        if (this.props.mapLines != undefined) {
            for (let i = 0; i < this.props.mapLines.length; i++) {
                tmp.push(<MapLine x1={this.props.mapLines[i]["x1"]} y1={this.props.mapLines[i]["y1"]}
                                  x2={this.props.mapLines[i]["x2"]} y2={this.props.mapLines[i]["y2"]}
                                  color={this.props.mapLines[i]["color"]} key={i}/>);
            }
        }

        return (tmp);
    }
    setPoints() {
        //let tmp: any[] = [];
        if (this.props.point !== undefined)
            return (<Marker position={this.props.point}></Marker>);

        console.log(this.props.point);
    }
}

export default Map;
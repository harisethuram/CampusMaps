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
import {Line} from "./Line";
import {Point} from "./Point";
import {LatLngExpression} from "leaflet";
import {
    LATITUDE_OFFSET,
    LATITUDE_SCALE, LONGITUDE_OFFSET, LONGITUDE_SCALE,
    UW_LATITUDE,
    UW_LATITUDE_CENTER,
    UW_LONGITUDE,
    UW_LONGITUDE_CENTER
} from "./Constants";

// properties of an ItemList
interface ItemListProps {
    onClear(): void
    onDraw(items: [Line[], LatLngExpression | undefined] | undefined): void
}

// state of an ItemList to store the text box
interface thisState {
    text: string;
}
/**
 * A text field that allows the user to enter the list of edges.
 * Also contains the buttons that the user will use to interact with the app.
 */
class ItemList extends Component<ItemListProps, thisState> {
    // construct an ItemList
    constructor(props: ItemListProps) {
        super(props);
        this.state = {text: ""};
    }

    // render the textbox to be used and the text within
    render() {
        return (
            <div id="edge-list">
                Edges <br/>
                <textarea
                    rows={5}
                    cols={30}
                    onChange={(evt) => {this.onChange(evt); /*this.props.onChange(evt.target.value)*/}}
                    value={this.state.text}
                /> <br/>
                <button onClick={() => {this.props.onDraw(this.onDraw(this.state.text));}}>Draw</button>
                <button onClick={() => {this.props.onClear(); this.onClear();}}>Clear</button>
            </div>
        );
    }

    // detect a change in the textbox and update it
    onChange(evt: any) {
        this.setState({text: (evt.target.value)});
    }

    // clear the textbox if the clear button is pressed
    onClear() {
        this.setState({text: ""});
    }

    // if the draw button is pressed, process the data in the textbox and return it as a list of lines/point.
    onDraw(text: string) {
        let linesAsStringWSpaces: string[] = text.split('\n');

        let linesAsString: string[] = [];
        for  (let i = 0; i < linesAsStringWSpaces.length; i++) {
            if (linesAsStringWSpaces[i].trim() !== "")
                linesAsString.push(linesAsStringWSpaces[i].trim());
        }
        let numCenter = 0;

        let edges: Line[] = [];
        let center = {} as Point;
        for (let i = 0; i < linesAsString.length; i++) {
            let lineAsString = linesAsString[i].trim().split(/\s+/);

            // check for if five elements are not passed in
            //console.log("Line:"+lineAsString);
            if (lineAsString.length !== 5 && lineAsString.length !== 2) {
                alert("format as: x1 y1 x2 y2 color for line \n or x1 y1 for a new center");
                return undefined;
            }
            if (lineAsString.length === 5) {
                let line = {} as Line;
                //console.log(line['x1']);
                line["x1"] = Number(lineAsString[0]);
                line["y1"] = Number(lineAsString[1]);
                line["x2"] = Number(lineAsString[2]);
                line["y2"] = Number(lineAsString[3]);
                line["color"] = lineAsString[4];
                //console.log(line['x1']);
                // check if numbers are NaN
                if (!this.checkLine(line))
                    return undefined;

                edges.push(line);
            } else {
                numCenter++;
                //console.log(numCenter);
                if (numCenter > 1) {
                    alert("can only input one center");
                    return undefined;
                }
                center["x"] = Number(lineAsString[0]);
                center["y"] = Number(lineAsString[1]);
                if (isNaN(center["x"]) || isNaN(center["y"])) {
                    alert("format as x1 y1 for a new center");
                    return undefined;
                }
            }
        }
        let centerExp = {} as LatLngExpression | undefined;
        if (center["x"] === undefined || center["y"] === undefined)
            centerExp = undefined;
        else
            centerExp = [UW_LONGITUDE + (center["x"] - LONGITUDE_OFFSET) * LONGITUDE_SCALE,
                UW_LATITUDE + (center["y"] - LATITUDE_OFFSET) * LATITUDE_SCALE];
        let tmp = {} as [Line[], LatLngExpression | undefined];
        tmp[0] = edges;
        tmp[1] = centerExp;
        return tmp;
    }

    // check if input is formatted correctly.
    checkLine(line: Line) {
        if (isNaN(line["x1"]) || isNaN(line["y1"]) || isNaN(line["x2"]) || isNaN(line["y2"])) {
            //console.log
            alert("format as: x1 y1 x2 y2 color")
            return false;
        }
        if (line["x1"] > 4000 || line["x1"] < 0 || line["y1"] > 4000 || line["y1"] < 0
            || line["x2"] > 4000 || line["x2"] < 0 || line["y2"] > 4000 || line["y2"] < 0) {
            alert("all coordinates are between 0 and 4000 (inclusive)")
            return false;
        }
        return true;
    }
}

export default ItemList;

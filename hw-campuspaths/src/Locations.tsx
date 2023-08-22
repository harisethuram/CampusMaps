import React, {Component} from 'react';
import {LOCS} from "./Constants";



interface LocProps {
    onSelect(text: string | undefined): void
}

interface LocState {
    text: string,
    bestFit: string[],
    selected: string | undefined
}

// text box and drop down to pick location
class Locations extends Component <LocProps, LocState> {
    constructor(props: LocProps) {
        super(props);
        this.state = {text: "", bestFit: LOCS, selected: undefined}
    }


    // update the text box and find best fit locations
    onChange = (evt: any) => {
        this.setState({text: evt.target.value, selected: undefined})
        this.setBestFit(evt.target.value);
    }

    // find the best fit locations given a text
    setBestFit = async (text: string) => {
        try {

            let a = "http://localhost:4567/locations?loc="+text
            //console.log("->"+a);
            let response = await fetch(a);
            if (!response.ok) {
                alert("The status is wrong! Expected: 200, Was: " + response.status);
                return;
            }
            let object = (await response.json());
            //console.log("->"+ object)
            this.setState({bestFit: object})
            //console.log(this.state.bestFit);
        } catch (e) {
            alert("There was an error contacting the server.");
            console.log(e);
        }
    }

    // if an element is selected
    onSelect = (evt: any) => {
        this.setState({text: evt.target.value, selected: evt.target.value});
        this.onChange(evt);
    }

    // render all drop down choices
    renderSelect = () => {
        let tmp: any[] = [];
        tmp.push(<option value="">--</option>)
        for (let i = 0; i < this.state.bestFit.length; i++)
            tmp.push(<option value={this.state.bestFit[i]}>{this.state.bestFit[i]}</option>)
        return tmp;
    }

    // render everything
    render = () => {

        return (
            <div>
                <div>
                    <textarea
                        rows={1}
                        cols={10}
                        onChange={this.onChange}
                        value={this.state.text}
                    />
                </div>
                <div><br></br></div>
                <div>
                    <select value={this.state.selected} onChange={(evt) => {this.onSelect(evt); this.props.onSelect(evt.target.value)}}>
                        {this.renderSelect()}
                    </select>
                </div>
            </div>

        )
    }
}

export default Locations;
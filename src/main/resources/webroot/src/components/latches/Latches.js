import React from 'react';
import BaseService from "../base/BaseService";
import Latches_content from "./Latches_content";
import Latches_content_item from "./Latches_content_item";

export default class Latches extends BaseService {
    constructor() {
        super('http://test.perf:31337/latches');
        this.state = {
            latches: []
        };
        this.callRemoteUrl = this.callRemoteUrl.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    updateState(data) {
        this.setState({
            latches: data
        });
    }

    render() {

        var latches = [];
        var counter = 0;

        if (Object.keys(this.state.latches).length > 0) {
            Object.keys(this.state.latches).map((item, id) => {
                latches.push(<Latches_content_item counter={counter} item={item} id={id} timestamp={this.state.latches[item]}/>);
                counter++;
            });
        }


        return (
            <div>
                <Latches_content latches={latches}/>
            </div>
        );
    }

}

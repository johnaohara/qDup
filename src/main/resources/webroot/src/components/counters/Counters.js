import React from 'react';
import BaseService from "../base/BaseService";
import Counters_content from "./Counters_content";

export default class Counters extends BaseService {
    constructor() {
        super('http://test.perf:31337/counters');
        this.state = {
            counters: []
        };
        this.callRemoteUrl = this.callRemoteUrl.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    updateState(data) {
        this.setState({
            counters: data
        });
    }

    render() {

        var counters = [];
        return (
            <div>
                <Counters_content counters={counters}/>
            </div>
        );
    }

}

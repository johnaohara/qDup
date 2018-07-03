import React from 'react';
import Active_sidebar from "./Active_sidebar";
import Active_content from "./Active_content";
import BaseService from "../base/BaseService";

export default class Active extends BaseService {
    constructor() {
        super('active');
        this.state = {
            scripts: [],
            output: '',
            name: '',
            host: ''
        };
        this.callRemoteUrl = this.callRemoteUrl.bind(this);
    }

    updateState(data) {
        this.setState({
            scripts: this.getScriptNames(data),
            output: data[0].output,
            name: data[0].name,
            host: data[0].host
        });
    }

    getScriptNames(json) {
        var scripts = json.map(function (obj) {
            var key = "script", rtn = {}; //Object.keys(obj).sort()["idleTime"];
            return rtn[key] = obj[key], rtn;
        });
        return scripts;
    }


    render() {
        return (
            <div>
                <Active_sidebar scripts={this.state.scripts}/>
                <Active_content output={this.state.output} name={this.state.name} host={this.state.host}/>
            </div>
        );
    }
}

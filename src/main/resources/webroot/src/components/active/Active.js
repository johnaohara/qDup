import React from 'react';
import Active_sidebar from "./Active_sidebar";
import Active_content from "./Active_content";

export default class Active extends React.Component {
    constructor() {
        super();
        this.state = {
            scripts: [],
            output: '',
            name: '',
            host: ''
        };
        this.getActiveCommands = this.getActiveCommands.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(() => this.getActiveCommands(), 1000);

    }

    componentWillUnmount() {
        this.timer = null;
    }

    getActiveCommands() {
        fetch('http://test.perf:31337/active', {mode: 'cors'})
            .then(response => {
                if (!response.ok) {
                    this.setState({scripts: [], output: '', name: '', host: ''});
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                this.setState({
                    scripts: this.getScriptNames(data),
                    output: data[0].output,
                    name: data[0].name,
                    host: data[0].host
                });
                // console.info(data[0].output);
            }).catch(function (error) {
            console.log(error);
            this.setState({scripts: [], output: '', name: '', host: ''});
        })
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

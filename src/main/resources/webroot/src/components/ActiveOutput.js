import React from 'react';

const reactStringReplace = require('react-string-replace')

export default class ActiveOutput extends React.Component {
    constructor() {
        super();
        this.state = {
            output: '',
            name: ''
        };
    }

    componentDidMount() {
        fetch('http://test.perf:31337/active', {mode: 'cors'})
            .then(results => {
                return results.json();
            }).then(data => {
            this.setState({output: data[0].output, name: data[0].name});
            console.info(data[0].output);
        })
    }

    render() {
        return (
            <div className="container">
                <h2>Name</h2>
                <p>{this.state.name}</p>
                <h2>Output</h2>
                <div className="console">
                    {/*<p dangerouslySetInnerHTML={{__html: this.state.output.replace(/(?:\\[rn]|[\r\n])/g,"<br>")}} />*/}
                    <p dangerouslySetInnerHTML={{__html: this.state.output.replace(/(?:\\[rn]|[\r\n])/g,"<br>")}} />
                </div>
            </div>
        );
    }
}

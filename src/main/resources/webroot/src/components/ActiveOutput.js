import React from 'react';

export default class ActiveOutput extends React.Component {
    constructor() {
        super();
        this.state = {
            output: ''
        };
    }

    componentDidMount() {
        fetch('http://test.perf:31338/active')
            .then(results => {
                return results.json();
            }).then(data => {
            this.setState({ output: data.output})
            console.info(data.output)
        })
    }

    render() {
        return (
            <div className="container">
                <p>{this.state.output}</p>
            </div>
        );
    }
}

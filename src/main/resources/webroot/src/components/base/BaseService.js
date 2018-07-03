import React from "react";


export default class BaseService extends React.Component {
    constructor(remoteEndpoint) {
        super();
        this.remoteUrl = 'http://test.perf:31337/'; //TODO:  populate dynamic
        this.remoteEndpoint = remoteEndpoint;
        this.getActiveCommands = this.callRemoteUrl.bind(this);
        this.callRemoteUrl;
    }

    componentDidMount() {
        this.setState({intervalId: setInterval(this.callRemoteUrl, 1000)});

    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    callRemoteUrl() {
        fetch(this.remoteUrl + this.remoteEndpoint, {mode: 'cors'}) //TODO: set url from props
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(data => {
                this.updateState(data);
            })
            .catch(
                function (error) {
                    console.error(error);
                }
            )
    }

}
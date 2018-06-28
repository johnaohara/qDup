import React from 'react';
import ActiveOutput from './ActiveOutput';
import PendingDownloadsOutput from './PendingDownloadsOutput';
import LatchesOutput from './LatchesOutput';
import CountersOutput from './CountersOutput';

export default class ConsoleApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showActiveOutput: true,
            showPendingdownloads: false,
            showLatches: false,
            showCounters: false,
        };
        this._onActiveClick = this._onActiveClick.bind(this);
        this._onPendingClick = this._onActiveClick.bind(this);
        this._onLatchesClick = this._onLatchesClick.bind(this);
        this._onCountersClick = this._onCountersClick.bind(this);
    }

    _onActiveClick() {
        this.setState({
            showActiveOutput: true,
            showPendingdownloads: false,
            showLatches: false,
            showCounters: false,
        })
    }

    _onPendingClick() {
        this.setState({
            showActiveOutput: false,
            showPendingdownloads: true,
            showLatches: false,
            showCounters: false,
        })
    }

    _onLatchesClick() {
        this.setState({
            showActiveOutput: false,
            showPendingdownloads: false,
            showLatches: true,
            showCounters: false,
        })
    }

    _onCountersClick() {
        this.setState({
            showActiveOutput: false,
            showPendingdownloads: false,
            showLatches: false,
            showCounters: true,
        })
    }

    render() {
        return (
            <div>
                {this.state.showActiveOutput ? <ActiveOutput/> : null}
                {this.state.showPendingdownloads ? <PendingDownloadsOutput/> : null}
                {this.state.showLatches ? <LatchesOutput/> : null}
                {this.state.showCounters ? <CountersOutput/> : null}
            </div>

        );
    }
}

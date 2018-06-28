import React from 'react';
import ReactDOM from 'react-dom';
import ConsoleApp from './components/ConsoleApp';
import Header from './components/Header';

export default class App extends React.Component {

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

    printDebugLine(){
        console.info("This is a debug message");
    }

}
ReactDOM.render(<ConsoleApp />, document.getElementById('app_content'));
ReactDOM.render(<Header />, document.getElementById('qdup_header'));



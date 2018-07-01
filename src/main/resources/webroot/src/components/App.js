import React from 'react';
import Header from './Header'
import Active from "./active/Active";
import Counters from "./counters/Counters";
import Downloads from "./downloads/Downloads";
import Latches from "./latches/Latches";

export default class App extends React.Component {

    constructor() {
        super();
        this.state = {
            display: 'active'
        };
    }

    changeHandler(value) {
        this.setState({display: value});
        console.info("Link clicked: " + value);
    }


    render() {
        return (
            <div>
                <header id="qdup_header">
                    <Header onChange={this.changeHandler.bind(this)}/>
                </header>

                {this.state.display == 'active' ? <Active/> : null}
                {this.state.display == 'counters' ? <Counters/> : null}
                {this.state.display == 'downloads' ? <Downloads/> : null}
                {this.state.display == 'latches' ? <Latches/> : null}
            </div>
        );
    }
}
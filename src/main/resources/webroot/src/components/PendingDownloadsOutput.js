import React from 'react';

export default class PendingDownloadsOutput extends React.Component {
    constructor() {
        super();
        this.state = [];
        this.getActiveCommands=this.getActiveCommands.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(() => this.getActiveCommands(), 1000);

    }

    componentWillUnmount() {
        this.timer = null;
    }

    getActiveCommands() {
        fetch('http://test.perf:31337/pendingDownloads', {mode: 'cors'})
            .then(response => {
                if (!response.ok) {
                    // this.setState({output: '', name: '', host: ''});
                    throw Error(response.statusText);
                }
                return response.json();
            }).then(data => {
            this.setState({output: data[0].output, name: data[0].name, host: data[0].host});
            // console.info(data[0].output);
        }).catch(function (error) {
            console.log(error);
            this.setState({output: '', name: '', host: ''});
        })
    }

    render() {
        return (
            <div id="editor">

                <div className="panel-v" style={{width: "calc(100% - 0.5px)"}}>
                    <div className="panel-h panel" style={{height: "calc(10% - 0.5px)"}}>

                        <div className="windowLabelCont">
                            <a href="#" className="windowLabel" data-panel="html" data-popover-trigger="html"> <span
                                className="label">Pending Downloads</span>
                                <svg width="8" height="7" viewBox="-0.019531 -52.792969 30.039062 25.195312">
                                    <path
                                        d="M29.941406 -52.500000C29.785156 -52.656250 29.589844 -52.753906 29.355469 -52.792969L0.644531 -52.792969C0.410156 -52.753906 0.214844 -52.656250 0.058594 -52.500000C-0.019531 -52.265625 0.000000 -52.050781 0.117188 -51.855469L14.472656 -27.890625C14.628906 -27.734375 14.804688 -27.636719 15.000000 -27.597656C15.234375 -27.636719 15.410156 -27.734375 15.527344 -27.890625L29.882812 -51.855469C30.000000 -52.089844 30.019531 -52.304688 29.941406 -52.500000ZM29.941406 -52.500000"></path>
                                </svg>
                            </a>
                        </div>

                        <div className="CodeMirror cm-s-default CodeMirror-wrap">
                            <div className="CodeMirror-scroll" tabIndex="-1">
                                <div className="CodeMirror-sizer"
                                     style={{
                                         marginLeft: "58px",
                                         marginBottom: "-15px",
                                         borderRightWidth: "15px",
                                         minHeight: "72px",
                                         paddingRight: "0px",
                                         paddingBottom: "0px"
                                     }}>
                                    <div style={{position: "relative", top: "0px"}}>
                                        <div className="CodeMirror-lines" role="presentation">
                    TODO :: Add pending downloads
                                        </div>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        position: "absolute",
                                        height: "15px",
                                        width: "1px",
                                        borderBottom: "0px solid transparent",
                                        top: "72px"
                                    }}></div>

                            </div>

                        </div>

                    </div>

                    < div className="gutter gutter-vertical" style={{height: "1px"}}/>
                    <div className="panel-h panel" style={{height: "calc(90% - 0.5px)"}}>

                    </div>

                </div>
            </div>
        )
            ;
    }
}

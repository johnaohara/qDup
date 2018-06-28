import React from 'react';

export default class ActiveOutput extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h1>
                    <span className="title">qDup Web console</span>
                    <div className="changelog-badge">
                        <a title="qDup Web Console" href="/">
                            <svg width="300px" height="150px" viewBox="0 0 300 150">
                                <g className="asd" strokeWidth="1.6" fill="none" fillRule={"evenodd"}>
                                    <path id="svg_1"
                                          d="m33.837289,68.120111c4.8233,8.308046 5.764929,10.831084 4.170172,11.173722c-3.11525,0.669334 -2.489235,4.49736 1.871078,11.441462c5.4683,8.708668 16.179024,14.056584 26.239694,13.101609c3.904971,-0.37067 8.319715,-1.135639 9.81054,-1.699957c1.490818,-0.564325 0.575994,0.486949 -2.032946,2.336146c-13.05142,9.250733 -29.170501,8.606343 -42.030025,-1.680212c-5.127334,-4.101457 -12.181749,-16.084775 -12.181749,-20.693131c0,-1.305516 -1.16303,-2.57051 -2.584508,-2.811083c-2.324663,-0.393431 -2.012473,-1.429348 3.105167,-10.303583c3.129325,-5.426402 6.075067,-10.255422 6.546098,-10.731153c0.471039,-0.475731 3.659952,3.964047 7.086481,9.866179l-0.000003,0.000002zm41.460414,16.01689c-4.823302,-8.308044 -5.764929,-10.831091 -4.17018,-11.173722c3.11525,-0.669323 2.489237,-4.497357 -1.87107,-11.441462c-5.468302,-8.708671 -16.179037,-14.056586 -26.239702,-13.101613c-3.904971,0.370665 -8.319707,1.135649 -9.81053,1.699969c-1.490826,0.564313 -0.575999,-0.486956 2.032941,-2.33615c13.051422,-9.250737 29.170503,-8.606352 42.030028,1.680217c5.127336,4.101443 12.181746,16.08477 12.181746,20.693117c0,1.305526 1.163041,2.57051 2.584503,2.811083c2.324673,0.393438 2.012475,1.429348 -3.105156,10.303588c-3.129322,5.426395 -6.075072,10.255417 -6.546098,10.731153c-0.471041,0.475731 -3.659952,-3.964042 -7.086481,-9.866177l0,-0.000002z"
                                          strokeWidth="1.5" stroke="#fff" fill="#fff"/>
                                    <text textAnchor="start" fontFamily="Oswald, sans-serif" fontSize="100" id="svg_2" y="105" x="120" fillOpacity="null" strokeOpacity="null" strokeWidth="0" stroke="#fff" fill="#ffffff">Dup</text>
                                    <line stroke="#fff" strokeLinecap="null" strokeLineJoin="null" id="svg_3"
                                          y2="103"
                                          x2="110" y1="41" x1="110" fillOpacity="null"
                                          strokeWidth="6" fill="none"/>
                                </g>
                            </svg>
                        </a>
                    </div>
                </h1>
                < div
                    id="actions">
                    <nav className="actionCont collapsed">
                        < div
                            className="actionItem">
                            < a
                                className="aiButton"
                                id="active"
                                title="Shortcut: Command/Ctrl + A"
                                href="#active">
                                < svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-play">
                                    <polygon
                                        points="5 3 19 12 5 21 5 3"/>
                                </svg>
                                Active </a>
                        </div>

                        <
                            div
                            className="actionItem">
                            < a
                                className="aiButton"
                                id="latches"
                                title="Shortcut: Command/Ctrl + L"
                                href="#latches">
                                < svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-upload-cloud">
                                    < polyline
                                        points="16 16 12 12 8 16"/>
                                    <line x1="12" y1="12" x2="12" y2="21"></line>
                                    < path
                                        d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
                                    <polyline points="16 16 12 12 8 16"></polyline>
                                </svg>
                                Latches </a>
                        </div>

                        <div
                            className="actionItem visible ">
                            <a className="aiButton"
                               id="counters"
                               title="Shortcut: Command/Ctrl + C"
                               href="#counters">
                                <svg
                                    width="48"
                                    height="24"
                                    viewBox="0 0 48 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-upload-cloud">
                                    <text style={{cursor: "move"}}
                                        textAnchor="start"
                                fontFamily="Helvetica, Arial, sans-serif"
                                fontSize="14"
                                id="svg_1"
                                y="16.84375"
                                x="2.601563"
                                strokeWidth="0"
                                stroke="#FFF"
                                fill="#FFFFF"> 0
                                0
                                0
                                1 </text>
                                    <line id="svg_2" y2="0" x2="0" y1="0" x1="48" stroke="#FFF" fill="none"/>
                                    < line
                                        id="svg_3"
                                        y2="0"
                                        x2="0"
                                        y1="24"
                                        x1="0"
                                        stroke="#FFF"
                                        fill="none"/>
                                    < line
                                        id="svg_5"
                                        y2="24"
                                        x2="0"
                                        y1="24"
                                        x1="48"
                                        fillOpacity="null"
                                        strokeOpacity="null"
                                        strokeWidth="null"
                                        stroke="#FFF"
                                        fill="none"/>
                                    <line
                                        id="svg_7"
                                        y2="0"
                                        x2="48"
                                        y1="24"
                                        x1="48"
                                        fillOpacity="null"
                                        strokeOpacity="null"
                                        strokeWidth="null"
                                        stroke="#FFF"
                                        fill="none"/>
                                    <line
                                        id="svg_8"
                                        y2="24"
                                        x2="12"
                                        y1="0"
                                        x1="12"
                                        fillOpacity="null"
                                        strokeOpacity="null"
                                        strokeWidth="null"
                                        stroke="#FFF"
                                        fill="none"/>
                                    < line
                                        id="svg_9"
                                        y2="24"
                                        x2="24"
                                        y1="0"
                                        x1="24"
                                        fillOpacity="null"
                                        strokeOpacity="null"
                                        strokeWidth="null"
                                        stroke="#FFF"
                                        fill="none"/>
                                    < line
                                        id="svg_10"
                                        y2="24"
                                        x2="36"
                                        y1="0"
                                        x1="36"
                                        fillOpacity="null"
                                        strokeOpacity="null"
                                        strokeWidth="null"
                                        stroke="#FFF"
                                        fill="none"/>
                                </svg>

                                Counters </a>
                        </div>

                        <div className="actionItem visible">
                            <a
                                className="aiButton"
                                id="pendingDownloads"
                                title="Fork into a new fiddle"
                                href="#pending">
                                < svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-upload-cloud">
                                    < line
                                        x1="12"
                                        y1="12"
                                        x2="12"
                                        y2="21">
                                    </line>
                                    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>

                                    <polyline
                                        points="16 16 12 21 8 16">
                                    </polyline>
                                </svg>
                                Pending
                                Downloads </a>
                        </div>
                    </nav>

                </div>
                )
            </div>
        );
    }
}

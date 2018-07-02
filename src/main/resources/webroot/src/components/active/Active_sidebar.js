import React from 'react';

export default class Active_sidebar extends React.Component {
    constructor() {
        super();
    }

    render() {
        var rows = [];
        var numrows = this.props.scripts.length;

        for (var i = 0; i < numrows; i++) {
            rows.push(<div className="sidebarItem" key={'sidebarItem_' + i}>
                <h3 className="toggler">
                    <a href="#">
                        {this.props.scripts[i].script.split(':')[1] + " (" + this.props.scripts[i].script.split(':')[2] + ")"}
                    </a>
                </h3>

            </div>);
        }

        return (
            <div id="sidebar">
                <section id="s-cont">

                    {rows}

                </section>
            </div>
        );
    }
}

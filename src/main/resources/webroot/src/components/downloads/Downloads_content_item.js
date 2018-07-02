import React from 'react';

export default class Downloads_sidebar extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="sidebarItem" key={'sidebarItem_' + this.props.counter}>
                <p>
                    {this.props.item}
                </p>
            </div>
        );
    }
}

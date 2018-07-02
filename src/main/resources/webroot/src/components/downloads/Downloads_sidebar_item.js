import React from 'react';

export default class Downloads_sidebar extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="sidebarItem" key={'sidebarItem_' + this.props.counter}>
                <h3 className="toggler">
                    <a href="#" key={'download_' + this.props.counter}>
                        {this.props.item}
                    </a>
                </h3>
            </div>
        );
    }
}

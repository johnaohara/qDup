import React from 'react';

export default class Downloads_sidebar extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div id="sidebar">
                <section id="s-cont">
                    {this.props.hosts}
                </section>
            </div>
        );
    }
}

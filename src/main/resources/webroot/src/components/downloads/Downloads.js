import React from 'react';
import Downloads_sidebar from "./Downloads_sidebar";
import Downloads_content from "./Downloads_content";
import Downloads_sidebar_item from "./Downloads_sidebar_item";
import Downloads_content_item from "./Downloads_content_item";
import BaseService from "../base/BaseService";

export default class Downloads extends BaseService {
    constructor() {
        super('http://test.perf:31337/pendingDownloads');
        this.state = {
            downloads: []
        };
        this.callRemoteUrl = this.callRemoteUrl.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    updateState(data) {
        this.setState({
            downloads: data
        });
    }

    render() {

        var hosts = [];
        var files = [];
        var counter = 0;
        var hostID = 0; //todo: make this dynamic

        if (Object.keys(this.state.downloads).length > 0) {
            Object.keys(this.state.downloads).map((item, id) => {
                hosts.push(<Downloads_sidebar_item counter={counter} item={item} id={id}/>);
                counter++;
            });

            this.state.downloads[Object.keys(this.state.downloads)[hostID]].map((item, id) => {
                files.push(<Downloads_content_item counter={counter} item={item.path} id={id}/>);
                counter++;
            });
        }

        return (
            <div>
                <Downloads_sidebar hosts={hosts}/>
                <Downloads_content files={files}/>
            </div>
        );
    }

}

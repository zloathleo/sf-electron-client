import React from 'react';
import PropTypes from 'prop-types';

import Const from './Const.jsx'
import EventProxy from './EventProxy.jsx'

class IndexSidebarMenu extends React.Component {

    constructor(props) {
        super(props);
        console.log(Const.KeyAlarm);
        this.actionClickItem = this.actionClickItem.bind(this);
    }

    componentDidMount() {
    }

    actionClickItem(proxy, event) {
        let target = proxy.target;
        let parentElement = target.parentElement;

        if (parentElement.tagName.toUpperCase() != "LI") {
            parentElement = parentElement.parentElement;
        }
        let key = parentElement.getAttribute("data-key");
        console.log('key:' + key);
        if (key == undefined) {
            console.log('error:' + key);
        } else {
            if (key != this.props.moduleName) {
                EventProxy.trigger('moduleName', key);
            }
        }
    }

    render() {
        switch (this.props.moduleName) {
            case Const.KeyDashboard: {
                return (
                    <ul className="menu accordion-menu" onClick={this.actionClickItem}>
                        <li data-key={Const.KeyDashboard} className="active"><a href="#" className="waves-effect waves-button"><span className="menu-icon glyphicon glyphicon-fire"></span><p>Dashboard</p></a></li>
                        <li data-key={Const.KeyAlarm}><a href="#" className="waves-effect waves-button"><span className="menu-icon glyphicon glyphicon-exclamation-sign"></span><p>Alarm</p></a></li>
                        <li data-key={Const.KeyConfiguration}><a href="#" className="waves-effect waves-button"><span className="menu-icon glyphicon glyphicon-cog"></span><p>Configuration</p></a></li>
                        <li data-key={Const.KeyUser}><a href="#" className="waves-effect waves-button"><span className="menu-icon glyphicon glyphicon-user"></span><p>User</p></a></li>
                    </ul>
                )
            }
            case Const.KeyAlarm: {
                return (
                    <ul className="menu accordion-menu" onClick={this.actionClickItem}>
                        <li data-key={Const.KeyDashboard} ><a href="#" className="waves-effect waves-button"><span className="menu-icon glyphicon glyphicon-fire"></span><p>Dashboard</p></a></li>
                        <li data-key={Const.KeyAlarm} className="active"><a href="#" className="waves-effect waves-button"><span className="menu-icon glyphicon glyphicon-exclamation-sign"></span><p>Alarm</p></a></li>
                        <li data-key={Const.KeyConfiguration}><a href="#" className="waves-effect waves-button"><span className="menu-icon glyphicon glyphicon-cog"></span><p>Configuration</p></a></li>
                        <li data-key={Const.KeyUser}><a href="#" className="waves-effect waves-button"><span className="menu-icon glyphicon glyphicon-user"></span><p>User</p></a></li>
                    </ul>
                )
            }
            case Const.KeyConfiguration: {
                return (
                    <ul className="menu accordion-menu" onClick={this.actionClickItem}>
                        <li data-key={Const.KeyDashboard} ><a href="#" className="waves-effect waves-button"><span className="menu-icon glyphicon glyphicon-fire"></span><p>Dashboard</p></a></li>
                        <li data-key={Const.KeyAlarm} ><a href="#" className="waves-effect waves-button"><span className="menu-icon glyphicon glyphicon-exclamation-sign"></span><p>Alarm</p></a></li>
                        <li data-key={Const.KeyConfiguration} className="active"><a href="#" className="waves-effect waves-button"><span className="menu-icon glyphicon glyphicon-cog"></span><p>Configuration</p></a></li>
                        <li data-key={Const.KeyUser}><a href="#" className="waves-effect waves-button"><span className="menu-icon glyphicon glyphicon-user"></span><p>User</p></a></li>
                    </ul>
                )
            }
            case Const.KeyUser: {
                return (
                    <ul className="menu accordion-menu" onClick={this.actionClickItem}>
                        <li data-key={Const.KeyDashboard} ><a href="#" className="waves-effect waves-button"><span className="menu-icon glyphicon glyphicon-fire"></span><p>Dashboard</p></a></li>
                        <li data-key={Const.KeyAlarm} ><a href="#" className="waves-effect waves-button"><span className="menu-icon glyphicon glyphicon-exclamation-sign"></span><p>Alarm</p></a></li>
                        <li data-key={Const.KeyConfiguration}><a href="#" className="waves-effect waves-button"><span className="menu-icon glyphicon glyphicon-cog"></span><p>Configuration</p></a></li>
                        <li data-key={Const.KeyUser} className="active"><a href="#" className="waves-effect waves-button"><span className="menu-icon glyphicon glyphicon-user"></span><p>User</p></a></li>
                    </ul>
                )
            }
        }

    };
}

IndexSidebarMenu.PropsType = {
    moduleName: PropTypes.string,
}

module.exports = IndexSidebarMenu;
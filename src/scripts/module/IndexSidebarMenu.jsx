import React from 'react';
import PropTypes from 'prop-types';

import Global from './common/Global.jsx'
import EventProxy from './common/EventProxy.jsx'

class IndexSidebarMenu extends React.Component {

    constructor(props) {
        super(props);
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
        if (key == undefined) {
            console.log('error:' + key);
        } else {
            if (key != this.props.moduleName) {
                EventProxy.trigger(Global.Const.Event_ModuleChange, key);
            }
        }
    }

    render() {
        let userName = Global.Status.UserName;
        if (!userName) {
            //guest访客
            switch (this.props.moduleName) {
                case Global.Const.Key_ModuleChange_Dashboard: {
                    return (
                        <ul className="menu accordion-menu" onClick={this.actionClickItem}>
                            <li data-key={Global.Const.Key_ModuleChange_Dashboard} className="active"><a href="#" className="waves-effect waves-button"><span className="menu-icon glyphicon glyphicon-fire"></span><p>Dashboard</p></a></li>
                            <li data-key={Global.Const.Key_ModuleChange_Alarm}><a href="#" className="waves-effect waves-button"><span className="menu-icon glyphicon glyphicon-exclamation-sign"></span><p>Alarm</p></a></li>
                        </ul>
                    )
                }
                case Global.Const.Key_ModuleChange_Alarm: {
                    return (
                        <ul className="menu accordion-menu" onClick={this.actionClickItem}>
                            <li data-key={Global.Const.Key_ModuleChange_Dashboard} ><a href="#" className="waves-effect waves-button"><span className="menu-icon glyphicon glyphicon-fire"></span><p>Dashboard</p></a></li>
                            <li data-key={Global.Const.Key_ModuleChange_Alarm} className="active"><a href="#" className="waves-effect waves-button"><span className="menu-icon glyphicon glyphicon-exclamation-sign"></span><p>Alarm</p></a></li>
                        </ul>
                    )
                }
            }

        } else { 
            //admin
            switch (this.props.moduleName) {
                case Global.Const.Key_ModuleChange_Dashboard: {
                    return (
                        <ul className="menu accordion-menu" onClick={this.actionClickItem}>
                            <li data-key={Global.Const.Key_ModuleChange_Dashboard} className="active"><a href="#" className="waves-effect waves-button"><span className="menu-icon glyphicon glyphicon-fire"></span><p>Dashboard</p></a></li>
                            <li data-key={Global.Const.Key_ModuleChange_Alarm}><a href="#" className="waves-effect waves-button"><span className="menu-icon glyphicon glyphicon-exclamation-sign"></span><p>Alarm</p></a></li>
                            <li data-key={Global.Const.Key_ModuleChange_Configuration}><a href="#" className="waves-effect waves-button"><span className="menu-icon glyphicon glyphicon-cog"></span><p>Configuration</p></a></li>
                        </ul>
                    )
                }
                case Global.Const.Key_ModuleChange_Alarm: {
                    return (
                        <ul className="menu accordion-menu" onClick={this.actionClickItem}>
                            <li data-key={Global.Const.Key_ModuleChange_Dashboard} ><a href="#" className="waves-effect waves-button"><span className="menu-icon glyphicon glyphicon-fire"></span><p>Dashboard</p></a></li>
                            <li data-key={Global.Const.Key_ModuleChange_Alarm} className="active"><a href="#" className="waves-effect waves-button"><span className="menu-icon glyphicon glyphicon-exclamation-sign"></span><p>Alarm</p></a></li>
                            <li data-key={Global.Const.Key_ModuleChange_Configuration}><a href="#" className="waves-effect waves-button"><span className="menu-icon glyphicon glyphicon-cog"></span><p>Configuration</p></a></li>
                        </ul>
                    )
                }
                case Global.Const.Key_ModuleChange_Configuration: {
                    return (
                        <ul className="menu accordion-menu" onClick={this.actionClickItem}>
                            <li data-key={Global.Const.Key_ModuleChange_Dashboard} ><a href="#" className="waves-effect waves-button"><span className="menu-icon glyphicon glyphicon-fire"></span><p>Dashboard</p></a></li>
                            <li data-key={Global.Const.Key_ModuleChange_Alarm} ><a href="#" className="waves-effect waves-button"><span className="menu-icon glyphicon glyphicon-exclamation-sign"></span><p>Alarm</p></a></li>
                            <li data-key={Global.Const.Key_ModuleChange_Configuration} className="active"><a href="#" className="waves-effect waves-button"><span className="menu-icon glyphicon glyphicon-cog"></span><p>Configuration</p></a></li>
                        </ul>
                    )
                }
            }
        }
    };
}

IndexSidebarMenu.PropsType = {
    moduleName: PropTypes.string,
}

module.exports = IndexSidebarMenu;
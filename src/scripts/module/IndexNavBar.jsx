import React from 'react';

import Const from './Const.jsx'
import EventProxy from './EventProxy.jsx'

class IndexNavBar extends React.Component {

    actionLogoutClick() {
        EventProxy.trigger(Const.Event_UIChange, Const.Key_UIChange_Login);
    }

    actionLockScreenClick() {
        EventProxy.trigger(Const.Event_UIChange, Const.Key_UIChange_Lock);
    }

    render() {
        return (
            <div className="navbar-inner">
                <div className="logo-box">
                    <a className="logo-text"><span>RodinX</span></a>
                </div>
                <div className="topmenu-outer">
                    <div className="top-menu">

                        <ul className="nav navbar-nav navbar-right">

                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle waves-effect waves-button waves-classNameic" data-toggle="dropdown">
                                    <span className="user-name">Admin<i className="fa fa-angle-down"></i></span>
                                    <span className="menu-icon glyphicon glyphicon-user"></span>
                                </a>
                                <ul className="dropdown-menu dropdown-list" role="menu">
                                    <li role="presentation"><a href="#" onClick={this.actionLockScreenClick}><i className="fa fa-lock"></i>Lock screen</a></li>
                                    <li role="presentation" className="divider"></li>
                                    <li role="presentation"><a href="#" onClick={this.actionLogoutClick}><i className="fa fa-sign-out m-r-xs"></i>Log out</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#" onClick={this.actionLogoutClick} className="log-out waves-effect waves-button waves-classNameic">
                                    <span><i className="fa fa-sign-out m-r-xs"></i>Log out</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    };
}

module.exports = IndexNavBar;
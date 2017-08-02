import React from 'react';

import Global from './common/Global.jsx';
import EventProxy from './common/EventProxy.jsx';
import HttpRequest from './common/HttpRequest.jsx';

class DropdownMenu extends React.Component {

    //进入admin登录界面
    actionLoginAdminClick() {
        EventProxy.trigger(Global.Const.Event_UserChange, Global.Const.Value_User_Admin);
    }

    //进入Root登录界面
    actionLoginRootClick() {
        EventProxy.trigger(Global.Const.Event_UserChange, Global.Const.Value_User_Root);
    }

    //进入普通用户界面
    actionLogoutClick() {
        var params = new URLSearchParams();
        params.append('user', 'guest');

        HttpRequest.axios.patch('/users/' + Global.Status.UserName);
        HttpRequest.afterLogout();
        //logout 请求
        EventProxy.trigger(Global.Const.Event_UserChange, Global.Const.Value_User_Guest);
    }

    actionLockScreenClick() {
        EventProxy.trigger(Global.Const.Event_UIChange, Global.Const.Key_UIChange_Lock);
    }

    render() {
        let userName = this.props.userName;
        if (Global.Const.Value_User_Guest == userName) {
            return (
                <ul className="dropdown-menu dropdown-list" role="menu">
                    <li role="presentation"><a href="#" onClick={this.actionLoginRootClick}><i className="fa fa-lock"></i>Root</a></li>
                    <li role="presentation"><a href="#" onClick={this.actionLoginAdminClick}><i className="fa fa-lock"></i>Configuration</a></li>
                </ul>
            )
        } else {
            return (
                <ul className="dropdown-menu dropdown-list" role="menu">
                    <li role="presentation"><a href="#" onClick={this.actionLogoutClick}><i className="fa fa-lock"></i>Layout</a></li>
                    <li role="presentation" className="divider"></li>
                    <li role="presentation"><a href="#" onClick={this.actionLockScreenClick}><i className="fa fa-lock"></i>Lock screen</a></li>
                </ul>
            )
        }

    }
}

class IndexNavBar extends React.Component {


    //退出程序
    actionExitClick() {
        console.log('client-ipc-menu-close');
        // ipcRenderer.send('client-ipc-menu-close', 'close');
    }

    render() {
        let userName = Global.Status.UserName;
        if (!userName) {
            userName = Global.Const.Value_User_Guest;
        }
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
                                    <span className="user-name">{userName}<i className="fa fa-angle-down"></i></span>
                                    <span className="menu-icon glyphicon glyphicon-user"></span>
                                </a>
                                <DropdownMenu userName={userName} />
                            </li>
                            <li>
                                <a href="#" onClick={this.actionExitClick} className="log-out waves-effect waves-button waves-classNameic">
                                    <span><i className="fa fa-sign-out m-r-xs"></i>Exit</span>
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
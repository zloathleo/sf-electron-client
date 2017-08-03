import React from 'react';

import Global from './common/Global.jsx';
import EventProxy from './common/EventProxy.jsx';
import HttpRequest from './common/HttpRequest.jsx';


window.IPC_Callback_RootLogin = function () {
    EventProxy.trigger(Global.Const.Event_UIChange, Global.Const.Key_UIChange_RootLogin);
}

class DropdownMenu extends React.Component {

    constructor(props) {
        super(props);
        //init
        this.actionGuestConfigServer = this.actionGuestConfigServer.bind(this);
        this.actionAdminConfigServer = this.actionAdminConfigServer.bind(this);
    }

    actionGuestConfigServer() {
        EventProxy.trigger(Global.Const.Event_ConfirmModal, {
            title: 'Are you sure you want to change server?',
            okFunc: this.actionGuestConfigOKButtonClick
        });
    }

    actionGuestConfigOKButtonClick() {
        EventProxy.trigger(Global.Const.Event_UIChange, Global.Const.Key_UIChange_GuestEnter);
    }

    actionAdminConfigServer() {
        EventProxy.trigger(Global.Const.Event_ConfirmModal, {
            title: 'Are you sure you want to change server?',
            okFunc: this.actionAdminConfigOKButtonClick
        });

    }

    actionAdminConfigOKButtonClick() {
        //先退出
        HttpRequest.axios.patch('/users/' + Global.Status.UserName);
        HttpRequest.afterLogout();
        EventProxy.trigger(Global.Const.Event_UIChange, Global.Const.Key_UIChange_GuestEnter);
    }

    //进入admin登录界面
    actionLoginAdminClick() {
        EventProxy.trigger(Global.Const.Event_UIChange, Global.Const.Key_UIChange_AdminLogin);
    }

    //进入Root登录界面
    actionLoginRootClick() {
        EventProxy.trigger(Global.Const.Event_UIChange, Global.Const.Key_UIChange_RootLogin);
    }

    //logout进入普通用户界面
    actionLogoutClick() {
        HttpRequest.axios.patch('/users/' + Global.Status.UserName);
        HttpRequest.afterLogout();
        //logout 请求
        EventProxy.trigger(Global.Const.Event_UIChange, Global.Const.Key_UIChange_AdminLogout);
    }

    actionLockScreenClick() {
        EventProxy.trigger(Global.Const.Event_UIChange, Global.Const.Key_UIChange_Lock);
    }

    render() {
        let userName = this.props.userName;
        if (Global.Const.Value_User_Guest == userName) {
            return (
                <div>
                    <ul className="dropdown-menu dropdown-list" role="menu">
                        <li role="presentation"><a href="#" onClick={this.actionGuestConfigServer}><i className="fa fa-cog"></i>Change Server</a></li>
                        <li role="presentation"><a href="#" onClick={this.actionLoginAdminClick}><i className="fa fa-cogs"></i>Configuration</a></li>
                    </ul>
                </div>
            )
        } else {
            return (
                <div>
                    <ul className="dropdown-menu dropdown-list" role="menu">
                        <li role="presentation"><a href="#" onClick={this.actionAdminConfigServer}><i className="fa fa-cog"></i>Change Server</a></li>
                        <li role="presentation"><a href="#" onClick={this.actionLogoutClick}><i className="fa fa-sign-out m-r-xs"></i>Layout</a></li>
                        <li role="presentation" className="divider"></li>
                        <li role="presentation"><a href="#" onClick={this.actionLockScreenClick}><i className="fa fa-lock"></i>Lock screen</a></li>
                    </ul>
                </div>
            )
        }

    }
}

class IndexNavBar extends React.Component {

    //退出程序
    actionExitClick() {
        HttpRequest.axios.patch('/users/' + Global.Status.UserName).then(function () {
            HttpRequest.afterLogout();
            IPC_CloseApp(Global.Status.UserName);
        }).catch(function () {
            HttpRequest.afterLogout();
            IPC_CloseApp(Global.Status.UserName);
        });

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
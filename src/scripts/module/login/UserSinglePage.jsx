import React from 'react';
import PropTypes from 'prop-types';
import forge from 'node-forge';

import Global from '../common/Global.jsx';
import EventProxy from '../common/EventProxy.jsx';
import HttpRequest from '../common/HttpRequest.jsx';

class UserPageContent extends React.Component {

    constructor(props) {
        super(props);
        this.inputServerURL = undefined;
        this.inputPassword = undefined;

        //init
        this.requestEnter = this.requestEnter.bind(this);
        this.requestLogin = this.requestLogin.bind(this);
        this.resetAdminPassword = this.resetAdminPassword.bind(this);
        this.requestUnlock = this.requestUnlock.bind(this);

    }

    requestEnter() {
        this.buttonEnter.setAttribute("disabled", "disabled");

        let url = this.inputServerURL.value;
        if (url) {
            HttpRequest.initURL(url, function () {
                this.buttonEnter.removeAttribute("disabled");
                EventProxy.trigger(Global.Const.Event_UIChange, Global.Const.Key_UIChange_Index);
            }.bind(this), function () {
                this.buttonEnter.removeAttribute("disabled");
            }.bind(this));
        }
    }

    requestLogin() {
        this.buttonLogin.setAttribute("disabled", "disabled");

        let url = localStorage.getItem('server.url');
        let userName = this.props.userName.toLowerCase();
        let password = this.inputPassword.value;

        let md = forge.md.md5.create();
        md.update(password);
        let passwordMd5 = md.digest().toHex().toUpperCase();

        var params = new URLSearchParams();
        params.append('password', passwordMd5);

        let _then = function (response) {
            this.buttonLogin.removeAttribute("disabled");
            HttpRequest.afterLogin(userName, password, response.data.access_token);
            if (userName == Global.Const.Value_User_Admin) {
                EventProxy.trigger(Global.Const.Event_UIChange, Global.Const.Key_UIChange_Index);
            } else if (userName == Global.Const.Value_User_Root) {
                EventProxy.trigger(Global.Const.Event_UIChange, Global.Const.RootResetPassword);
            }

        }.bind(this);

        let _catch = function (error) {
            this.buttonLogin.removeAttribute("disabled");
        }.bind(this);

        HttpRequest.axios.patch('/users/' + userName, params).then(_then).catch(_catch);
    }

    resetAdminPassword() {
        this.buttonReset.setAttribute("disabled", "disabled");

        let _then = function (response) {
            this.buttonReset.removeAttribute("disabled");
            toastr.info('Reset admin Password ok.');

        }.bind(this);

        let _catch = function (error) {
            this.buttonReset.removeAttribute("disabled");
        }.bind(this);

        HttpRequest.axios.put('/users/admin/password').then(_then).catch(_catch);
    }

    requestUnlock() {
        this.buttonUnlock.setAttribute("disabled", "disabled");
        let password = this.inputPassword.value;
        let passwordLocal = Global.Status.UserPassword;
        if (passwordLocal == password) {
            EventProxy.trigger(Global.Const.Event_UIChange, Global.Const.Key_UIChange_Index);
        } else {
            toastr.error(this.props.userName + ',invalid password.');
        }
        this.buttonUnlock.removeAttribute("disabled");
    }

    render() {
        let type = this.props.type;
        let userName = this.props.userName;
        if (type == "guest.enter") {
            let serverUrl = localStorage.getItem('server.url');
            if (!serverUrl) {
                serverUrl = '';
            }
            return (
                <div>
                    <p className="text-center m-t-md">Enter server host.</p>
                    <div className="form-group">
                        <input ref={(ref) => this.inputServerURL = ref} type="text" className="form-control" defaultValue={serverUrl} placeholder="Server Host" required />
                    </div>
                    <button ref={(ref) => this.buttonEnter = ref} className="btn btn-success btn-block" onClick={this.requestEnter}>Enter</button>
                    <p className="text-center m-t-xs text-sm">2017 &copy; RodinX by Safefire.</p>
                </div>
            )
        } else if (type == "user.login") {
            return (
                <div>
                    <p className="text-center m-t-md">Please Enter {userName}'s Password.</p>
                    <div className="form-group">
                        <input ref={(ref) => this.inputPassword = ref} type="password" className="form-control" placeholder="Password" required />
                    </div>
                    <button ref={(ref) => this.buttonLogin = ref} className="btn btn-success btn-block" onClick={this.requestLogin}>Submit</button>
                    <p className="text-center m-t-xs text-sm">2017 &copy; RodinX by Safefire.</p>
                </div>
            )
        } else if (type == "root.resetpassword") {
            return (
                <div>
                    <div className="input-group-btn">
                        <button ref={(ref) => this.buttonReset = ref} className="btn btn-success btn-block" onClick={this.resetAdminPassword}>Reset admin's Password</button>
                    </div>
                    <p className="text-center m-t-xs text-sm">2017 &copy; RodinX by Safefire.</p>
                </div>
            )
        } else if (type == "screen.lock") {
            return (
                <div>
                    <p className="lead no-m text-center">Welcome Back, {userName}!</p>
                    <p className="text-sm text-center">Enter password to unlock</p>
                    <div className="input-group">
                        <input ref={(ref) => this.inputPassword = ref} type="password" className="form-control" placeholder="Password" required />
                        <div className="input-group-btn">
                            <button ref={(ref) => this.buttonUnlock = ref} onClick={this.requestUnlock} className="btn btn-success">Submit</button>
                        </div>
                    </div>
                    <p className="text-center m-t-xs text-sm">2017 &copy; RodinX by Safefire.</p>
                </div>
            )
        }

    }
}

//Admin 和 Root 用户 登录界面
class UserSinglePage extends React.Component {

    constructor(props) {
        super(props);

        //init
        this.backToIndex = this.backToIndex.bind(this);
    }
    backToIndex() {
        if (this.props.type == 'screen.lock') {
            toastr.info('Please Enter password to unlock.');
        } else {
            if (Global.Status.UserName == Global.Const.Value_User_Root) {
                //root 用户 先logout
                HttpRequest.axios.patch('/users/' + Global.Status.UserName);
                HttpRequest.afterLogout();
                //logout 请求
                EventProxy.trigger(Global.Const.Event_UIChange, Global.Const.Key_UIChange_AdminLogout);
            } else {
                EventProxy.trigger(Global.Const.Event_UIChange, Global.Const.Key_UIChange_Index);
            }
        }
    }

    render() {
        let type = this.props.type;
        let userName = this.props.userName;
        return (
            <main className="page-content">
                <div className="page-inner">
                    <div id="main-wrapper">
                        <div className="row">
                            <div className="col-md-3 center">
                                <div className="login-box">
                                    <a href="#" onClick={this.backToIndex} className="logo-name text-lg text-center">RodinX</a>
                                    <UserPageContent userName={userName} type={type} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

UserSinglePage.PropsType = {
    type: PropTypes.string,
    userName: PropTypes.string
}

module.exports = UserSinglePage;


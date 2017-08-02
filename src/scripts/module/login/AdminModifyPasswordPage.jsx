import React from 'react';
import PropTypes from 'prop-types';
import forge from 'node-forge';

import Global from '../common/Global.jsx';
import EventProxy from '../common/EventProxy.jsx';
import HttpRequest from '../common/HttpRequest.jsx';

//Admin 和 Root 用户 登录界面
class AdminModifyPasswordPage extends React.Component {

    constructor(props) {
        super(props);

        //init
        this.resetAdminPassword = this.resetAdminPassword.bind(this);
    }

    resetAdminPassword() {
        this.buttonReset.setAttribute("disabled", "disabled");



        var params = new URLSearchParams();
        params.append('password', passwordMd5);

        let _then = function (response) {
            this.buttonReset.removeAttribute("disabled");
            HttpRequest.afterLogin(userName, password, response.data.access_token);
            EventProxy.trigger(Global.Const.Event_UIChange, Global.Const.Key_UIChange_Index);
        }.bind(this);

        let _catch = function (error) {
            this.buttonReset.removeAttribute("disabled");
        }.bind(this);

        HttpRequest.axios.patch('/users/' + userName, params).then(_then).catch(_catch);
    }

    render() {
        let userName = this.props.userName;
        return (
            <main className="page-content">
                <div className="page-inner">
                    <div id="main-wrapper">
                        <div className="row">
                            <div className="col-md-3 center">
                                <div className="login-box">
                                    <a href="#" className="logo-name text-lg text-center">RodinX</a>
                                    <button ref={(ref) => this.buttonReset = ref} className="btn btn-primary btn-block" onClick={this.resetAdminPassword}>Reset admin's Password</button>
                                    <div className="form-group">
                                        <input ref={(ref) => this.inputPassword = ref} type="password" className="form-control" placeholder="Password" required />
                                    </div>
                                    <p className="text-center m-t-xs text-sm">2017 &copy; RodinX by Safefire.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

AdminModifyPasswordPage.PropsType = {
    userName: PropTypes.string
}

module.exports = AdminModifyPasswordPage;


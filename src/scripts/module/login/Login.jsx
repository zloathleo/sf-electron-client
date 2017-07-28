import React from 'react';
import ReactDOM from 'react-dom';
import forge from 'node-forge';

import Const from '../Const.jsx';
import EventProxy from '../EventProxy.jsx';

import HttpRequest from '../common/HttpRequest.jsx';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.inputServerURL = undefined;
        this.inputUserName = undefined;
        this.inputPassword = undefined;

        //init
        this.requestLogin = this.requestLogin.bind(this);
    }

    componentDidMount() {
        let url = localStorage.getItem('server.url');
        let userName = localStorage.getItem('user.name');
        let password = localStorage.getItem('user.password');

        if (url) {
            this.inputServerURL.value = url;
        }

        if (userName) {
            this.inputUserName.value = userName;
        }

        if (password) {
            this.inputPassword.value = password;
        }
    }

    requestLogin() {
        this.buttonLogin.setAttribute("disabled", "disabled");

        let url = this.inputServerURL.value;
        let userName = this.inputUserName.value;
        let password = this.inputPassword.value;

        let md = forge.md.md5.create();
        md.update(password);
        let passwordMd5 = md.digest().toHex().toUpperCase();

        HttpRequest.init(url);
        var params = new URLSearchParams();
        params.append('password', passwordMd5);

        let _then = function (response) {
            this.buttonLogin.removeAttribute("disabled");
            HttpRequest.cahceUserToken(userName, password, response.data.token);
            EventProxy.trigger(Const.Event_UIChange, Const.Key_UIChange_Index);
        }.bind(this);

        let _catch = function (error) {
            HttpRequest.errorHandle(error);
            this.buttonLogin.removeAttribute("disabled");
        }.bind(this);

        HttpRequest.axios.patch('/users/' + userName, params).then(_then).catch(_catch);
    }

    render() {
        return (
            <main className="page-content">
                <div className="page-inner">
                    <div id="main-wrapper">
                        <div className="row">
                            <div className="col-md-3 center">
                                <div className="login-box">
                                    <a href="index.html" className="logo-name text-lg text-center">RodinX</a>
                                    <p className="text-center m-t-md">Please login into your account.</p>

                                    <div className="form-group">
                                        <input ref={(ref) => this.inputServerURL = ref} type="text" className="form-control" placeholder="Server Host" required />
                                    </div>
                                    <div className="form-group">
                                        <input ref={(ref) => this.inputUserName = ref} type="text" className="form-control" placeholder="User Name" required />
                                    </div>
                                    <div className="form-group">
                                        <input ref={(ref) => this.inputPassword = ref} type="password" className="form-control" placeholder="Password" required />
                                    </div>
                                    <button ref={(ref) => this.buttonLogin = ref} className="btn btn-primary btn-block" onClick={this.requestLogin}>Login</button>

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

module.exports = Login;


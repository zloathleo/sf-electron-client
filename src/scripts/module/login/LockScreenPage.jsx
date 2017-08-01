import React from 'react'; 

import Global from '../common/Global.jsx'
import EventProxy from '../common/EventProxy.jsx' 

class LockScreenPage extends React.Component {

    constructor(props) {
        super(props);
        this.inputPassword = undefined;

        //init
        this.requestLogin = this.requestLogin.bind(this);
        this.userName = localStorage.getItem("user.name");
    }

    requestLogin() {
        this.buttonLogin.setAttribute("disabled", "disabled");
        let password = this.inputPassword.value;
        let passwordLocal = localStorage.getItem('user.password');
        if (passwordLocal == password) {
            EventProxy.trigger(Global.Const.Event_UIChange, Global.Const.Key_UIChange_Index);
        } else {
            toastr.error(this.userName + ',invalid password.');
        }
        this.buttonLogin.removeAttribute("disabled");
    }

    render() {
        return (
            <main className="page-content">
                <div className="page-inner">
                    <div id="main-wrapper">
                        <div className="row">
                            <div className="col-md-3 center">
                                <div className="login-box">
                                    <div className="user-box m-t-lg row">
                                        <div className="col-md-12 m-b-md">
                                            <i className="fa fa-user fa-4x lock-screen-logo"></i>
                                        </div>
                                        <div className="col-md-12">
                                            <p className="lead no-m text-center">Welcome Back, {this.userName}!</p>
                                            <p className="text-sm text-center">Enter password to unlock</p>
                                            <div className="input-group">
                                                <input ref={(ref) => this.inputPassword = ref} type="password" className="form-control" placeholder="Password" required />
                                                <div className="input-group-btn">
                                                    <button ref={(ref) => this.buttonLogin = ref} onClick={this.requestLogin} className="btn btn-success">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

module.exports = LockScreenPage;


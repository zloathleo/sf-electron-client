import React from 'react'; 

import Global from '../common/Global.jsx';
import EventProxy from '../common/EventProxy.jsx'; 
import HttpRequest from '../common/HttpRequest.jsx';

class GuestEnterPage extends React.Component {

    constructor(props) {
        super(props);

        this.inputServerURL = undefined;

        //init
        this.requestLogin = this.requestLogin.bind(this);
    }

    componentDidMount() {

    }

    requestLogin() {
        this.buttonLogin.setAttribute("disabled", "disabled");

        let url = this.inputServerURL.value;
        if (url) {
            HttpRequest.initURL(url, function () {
                this.buttonLogin.removeAttribute("disabled");
                EventProxy.trigger(Global.Const.Event_UIChange, Global.Const.Key_UIChange_Index);
            }.bind(this), function () {
                this.buttonLogin.removeAttribute("disabled");
            }.bind(this));
        }
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
                                    <p className="text-center m-t-md">Enter server host.</p>

                                    <div className="form-group">
                                        <input ref={(ref) => this.inputServerURL = ref} type="text" className="form-control" placeholder="Server Host" required />
                                    </div>

                                    <button ref={(ref) => this.buttonLogin = ref} className="btn btn-primary btn-block" onClick={this.requestLogin}>Enter</button>

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

module.exports = GuestEnterPage;


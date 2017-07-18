import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.inputServerURL = undefined;
        this.inputUserName = undefined;
        this.inputPassword = undefined;

        //init
        this.requestLogin = this.requestLogin.bind(this);
    }
    requestLogin() {
        let url = this.inputServerURL.value;
        let userName = this.inputUserName.value;
        let password = this.inputPassword.value;

        sessionStorage.setItem("server.url", url);


        axios.defaults.baseURL = 'http://' + url;
        axios.defaults.headers.common['Origin'] = 'http://electron';
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        axios.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded';

        let url_req = '/users/admin';

        var params = new URLSearchParams();
        params.append('password', '21232F297A57A5A743894A0E4A801FC3');

        axios.patch(url_req, params, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });

        // window.location.href = 'index.html';
    }

    render() {
        return (<div className="login-form">
            <input ref={(ref) => this.inputServerURL = ref} type="text" defaultValue="192.168.2.99:8080" />
            <input ref={(ref) => this.inputUserName = ref} type="text" placeholder="username" />
            <input ref={(ref) => this.inputPassword = ref} type="password" placeholder="password" />
            <button onClick={this.requestLogin}>login</button>
        </div>);
    }
}

ReactDOM.render(
    <LoginForm />,
    document.getElementById('login-form-parent')
);



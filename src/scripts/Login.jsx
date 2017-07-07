import React from 'react';
import ReactDOM from 'react-dom';

class LoginForm extends React.Component {

    requestLogin() {
        window.location.href = 'index.html';
    }

    render() {
        return (<div className="login-form">
            <input id="username" type="text" placeholder="username" />
            <input id="password" type="password" placeholder="password" />
            <button id="login" onClick={this.requestLogin}>login</button>
        </div>);
    }
}

ReactDOM.render(
    <LoginForm />,
    document.getElementById('login-form-parent')
);

// function requestLogin() {
//     let _username = $('input#username').val();
//     let _password = $('input#password').val();
//     console.log('_username:' + _username);
//     console.log('_password:' + _password);
//     window.location.href = 'overview.html';
// }

// function initUI() {
//     $("button#login").click(function () {
//         requestLogin();
//     });
// }

// $(document).ready(function () {
//     initUI();
// });



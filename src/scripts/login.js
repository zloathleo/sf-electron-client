// import { firstName, lastName, year } from './module/const';

// import React from 'react'; 
// import ReactDOM from 'react-dom';

// class HelloMessage extends React.Component {
//     render() {
//         return <div>Hello {this.props.name}</div>;
//     }
// }

// ReactDOM.render(
//     <HelloMessage name="John" />,
//     document.getElementById('abc')
// );

function requestLogin() {
    let _username = $('input#username').val();
    let _password = $('input#password').val();
    console.log('_username:' + _username);
    console.log('_password:' + _password);
    window.location.href = 'overview.html';
}

function initUI() {
    $("button#login").click(function () {
        requestLogin();
    });
}

$(document).ready(function () {
    initUI();
});



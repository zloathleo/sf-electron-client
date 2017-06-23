// import { firstName, lastName, year } from './module/const';


function requestLogin() {
    let _username = $('input#username').val();
    let _password = $('input#password').val();
    console.log('_username:' + _username);
    console.log('_password:' + _password);
} 

function initUI() {
    $("button#login").click(function () {
        requestLogin();
    });
}

$(document).ready(function () {
    initUI();
});

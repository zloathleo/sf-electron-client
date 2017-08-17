// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const ipcRenderer = require('electron').ipcRenderer

window.IPC_CloseApp = function (message) {
    ipcRenderer.send('client-ipc-menu-close', message);
}

//快捷键Root 登录
ipcRenderer.on('main-ipc-root-login', function (event, message) {
    console.log(message);
    window.IPC_Callback_RootLogin();
});

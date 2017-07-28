// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const ipcRenderer = require('electron').ipcRenderer

setInterval(function () {
    console.log('ipcRenderer send');
    ipcRenderer.send('client-ipc-menu-close', 'ping')
}, 2000);
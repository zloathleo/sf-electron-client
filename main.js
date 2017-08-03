const electron = require('electron')

const path = require('path')
const url = require('url')

// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const globalShortcut = electron.globalShortcut
const ipcMain = electron.ipcMain
const Menu = electron.Menu
const Tray = electron.Tray

const logoImagePath = path.join(__dirname, '/public/assets/images/logo.png');
const logoPath = path.join('file://', __dirname, '/public/html/logo.html');
const appLoginPath = path.join('file://', __dirname, '/public/html/index.html')

let mainWindow;
let logoWindow;
let screenSize;

function readyInit() {
    console.log('chrome ver.' + process.versions.chrome);
    _showLogoWindow();

    //进度条
    var _percent = 0.1;
    var timer;
    timer = setInterval(function () {
        logoWindow.setProgressBar(_percent);
        _percent = _percent + 0.1;
        if (_percent >= 1) {
            clearInterval(timer);
        }
    }, 200);

    //打开主界面
    setTimeout(_showMainWindow, 2000);
}

function _showLogoWindow() {
    let electronScreen = electron.screen
    screenSize = electronScreen.getPrimaryDisplay().size;
    // logoImagePath = path.join(__dirname, '/main/asset/images/logo.png');
    console.log('logoImagePath:' + logoImagePath);

    logoWindow = new BrowserWindow({
        frame: false,
        transparent: true,
        center: true,
        disableAutoHideCursor: false,
        icon: logoImagePath,
        width: screenSize.width * 0.33,
        height: screenSize.height * 0.33,
    });

    logoWindow.setIgnoreMouseEvents(true);

    logoWindow.on('close', function () {
        logoWindow = null;
    });
    logoWindow.loadURL(logoPath);
    logoWindow.show();
}

function _showMainWindow() {

    // Create the browser window.
    mainWindow = new BrowserWindow({
        frame: true,
        center: true,
        icon: logoImagePath,
        width: screenSize.width * 0.9,
        height: screenSize.height * 0.9,
        autoHideMenuBar: true,
        minWidth: 1024,
        minHeight: 768,

        show: false,
        //禁用 Node.js
        webPreferences: {
            nodeIntegration: true
        }
    })

    mainWindow.loadURL(appLoginPath);

    initTray();

    initShortcut();

    //进程间通讯
    initIpc();


    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        mainWindow.maximize();
        logoWindow.close();
    });

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        mainWindow = null;
    });

}

//初始化快捷键
function initShortcut() {
    //root登录
    globalShortcut.register('Ctrl+F10', function () {
        mainWindow.webContents.send('main-ipc-root-login', 'root');
    })
    globalShortcut.register('Ctrl+F11', function () {
        mainWindow.setFullScreen(!mainWindow.isFullScreen());
    })
    globalShortcut.register('Ctrl+F12', function () {
        mainWindow.webContents.openDevTools()
    })
}

//初始化Tray
function initTray() {
    let appTray = new Tray(logoImagePath);
    const contextMenu = Menu.buildFromTemplate([{
        label: 'RodinX Exit',
        click: function () {
            rodinxExit();
        }
    }]);
    appTray.setToolTip('RodinX');
    appTray.setContextMenu(contextMenu);
}

//进程间通讯
function initIpc() {
    ipcMain.on('client-ipc-menu-close', function (event, arg) {
        console.log('ipc recivice:' + arg);
        rodinxExit();
    })
}

function rodinxExit() {
    app.quit();
}

// This method will be called when Electron has finished 
app.on('ready', readyInit);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    rodinxExit();
});

//退出
app.on('will-quit', function () {
    globalShortcut.unregisterAll()
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        readyInit();
    }
}); 
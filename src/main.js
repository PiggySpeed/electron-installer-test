const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const { autoUpdater } = require('electron-updater');

// production vs dev mode
const IS_PRODUCTION = !!(process.env.NODE_ENV) && (process.env.NODE_ENV.trim() === 'production');

// global reference to window object
let win;

function createWindow() {
  autoUpdater.checkForUpdatesAndNotify();

  // create the window
  win = new BrowserWindow({
    width: 800,
    height: 600
  });

  // load index.html
  win.loadURL(url.format({
    pathname: IS_PRODUCTION ? path.join(__dirname, '../build/index.html') : path.join(__dirname,'index.html'),
    protocol: 'file:',
    slashes: 'true'
  }));

  // open devTools
  win.webContents.openDevTools();

  // close the window
  win.on('closed', () => {
    win = null;
  });

}

// called when Electron has finished init and ready to create windows
app.on('ready', createWindow);

// quit when all windows are closed
app.on('window-all-closed', () => {

  // handle macOS since apps and menu bar stays active
  if (process.platform !== 'darwin') {
    app.quit();
  }

});

app.on('activate', () => {

  // in macOS, re-create the app window when dock icon clicked ands no other windows open
  if (win === null) {
    createWindow();
  }

});

// ------------------------------------------------------------------
// AUTO UPDATER CODE
// ref: https://github.com/iffy/electron-updater-example/blob/master/main.js
// ref: https://www.youtube.com/watch?v=_Hnzuko2eAc
//
// Open a window that displays the version
//
// THIS SECTION IS NOT REQUIRED
//
// This isn't required for auto-updates to work, but it's easier
// for the app to show a window than to have to click "About" to see
// that updates are working.
//-------------------------------------------------------------------

function sendStatusToWindow(text) {
  console.log("LOG:", text);
  // log.info(text);
  // win2.webContents.send('message', text);
}
autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
});
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available.');
});
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.');
});
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater. ' + err);
});
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond
    + ' - Downloaded ' + progressObj.percent + '%'
    + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  sendStatusToWindow(log_message);
});
autoUpdater.on('update-downloaded', (info) => {
  sendStatusToWindow('Update downloaded');
  autoUpdater.quitAndInstall();
});

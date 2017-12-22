const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

// global reference to window object
let win;

function createWindow() {

  // create the window
  win = new BrowserWindow({
    width: 600,
    height: 400
  });

  // load index.html
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'src/index.html'),
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


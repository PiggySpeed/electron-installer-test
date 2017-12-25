const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

// production vs dev mode
const IS_PRODUCTION = !!(process.env.NODE_ENV) && (process.env.NODE_ENV.trim() === 'production');

// global reference to window object
let win;

function createWindow() {

  // create the window
  win = new BrowserWindow({
    width: 800,
    height: 600
  });

  // console.log('IS PRODUCTION? ', IS_PRODUCTION, " [" +  process.env.NODE_ENV + "]");

  // load index.html

  win.loadURL(url.format({
    pathname: IS_PRODUCTION ? path.join(__dirname, 'dist/index.html') : path.join(__dirname,'src/index.html'),
    protocol: 'file:',
    slashes: 'true'
  }));

  console.log('PATH 2 IS: ', path.join(__dirname,'src/index.html'));

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



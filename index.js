const {app, BrowserWindow, session, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const {autoUpdater} = require("electron-updater");

let win;
let update;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    icon: __dirname + '/img/saoxlogo.png',
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      nativeWindowOpen: true,
      enableRemoteModule: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('test.html')

  win.on('closed', function () {
    win = null;
  });

  autoUpdater.autoInstallOnAppQuit = true;

  autoUpdater.checkForUpdatesAndNotify();

  win.setThumbarButtons([
    {
      tooltip: 'Prev',
      icon: path.join(__dirname, '/img/previous.png'),
      click () { win.webContents.send('media-key', 'Prev') }
    },
    {
      tooltip: 'Play',
      icon: path.join(__dirname, '/img/play.png'),
      click () { win.webContents.send('media-key', 'MediaPlayPause') }
    },
    {
      tooltip: 'Next',
      icon: path.join(__dirname, '/img/next.png'),
      click () { win.webContents.send('media-key', 'Next') }
    }
    
  ])

  win.maximize();

  /*win.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });*/

  // Open the DevTools.
  // win.webContents.openDevTools()

  // session.defaultSession.cookies.get({}, (error, cookies) => {
  //  console.log(error, cookies)
  // });

}

app.commandLine.appendSwitch('disable-site-isolation-trials')

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
//app.on('ready', createWindow);

//autoUpdater.on('update-downloaded', (ev, info) => {
  // Wait 5 seconds, then quit and install
  // In your application, you don't need to wait 5 seconds.
  // You could call autoUpdater.quitAndInstall(); immediately
  //setTimeout(function() {
    //autoUpdater.quitAndInstall();  
  //}, 5000)
//})

app.on('ready', function()  {
  //autoUpdater.checkForUpdatesAndNotify();
  createWindow();
});

// Quit when all windows are closed.
/*app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})*/

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    if (update == '1'){
      autoUpdater.quitAndInstall();
    }else{
      app.quit();
    }
  }
});

//app.on('window-all-closed', app.quit);
app.on('before-quit', () => {
  //globalShortcut.unregisterAll()
  //if (update == '1'){
    //autoUpdater.quitAndInstall();
  //}else{
    //win.removeAllListeners('close');
    //win.close();
  //}
  //win.removeAllListeners('close');
  //win.close();
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

//app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  //if (BrowserWindow.getAllWindows().length === 0) {
    //createWindow()
  //}
//})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

autoUpdater.on('update-not-available', () => {
  win.webContents.send('update_not_available');
});

autoUpdater.on('update-available', () => {
  autoUpdater.downloadUpdate();
  win.webContents.send('update_available');
});

autoUpdater.on('download-progress', (progressObj) => {
  win.webContents.send('incoming',progressObj.percent);
});

autoUpdater.on('update-downloaded', () => {
  //win.webContents.send('update_downloaded');
  //setTimeout(function(){ autoUpdater.quitAndInstall(false,true); }, 5000);
  //update = '1';
  autoUpdater.quitAndInstall();
  update = '1';
  win.webContents.send('update_downloaded');
});

autoUpdater.on('error', (progressObj) => {
  win.webContents.send('incoming',progressObj.error);
});

/*autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox({
    title: 'Install Updates',
    message: 'Updates downloaded, application will be quit for update...'
  }, () => {
    setImmediate(() => autoUpdater.quitAndInstall())
  })
})*/

ipcMain.on('restart_app', () => {
  update = '1';
  //win.close();
  autoUpdater.quitAndInstall();
});

ipcMain.on('pause', () => {
  win.setThumbarButtons([
    {
      tooltip: 'Prev',
      icon: path.join(__dirname, '/img/previous.png'),
      click () { win.webContents.send('media-key', 'Prev') }
    },
    {
      tooltip: 'Play',
      icon: path.join(__dirname, '/img/play.png'),
      click () { win.webContents.send('media-key', 'MediaPlayPause') }
    },
    {
      tooltip: 'Next',
      icon: path.join(__dirname, '/img/next.png'),
      click () { win.webContents.send('media-key', 'Next') }
    }
    
  ])
});

ipcMain.on('play', () => {
  win.setThumbarButtons([
    {
      tooltip: 'Prev',
      icon: path.join(__dirname, '/img/previous.png'),
      click () { win.webContents.send('media-key', 'Prev') }
    },
    {
      tooltip: 'Pause',
      icon: path.join(__dirname, '/img/pause.png'),
      click () { win.webContents.send('media-key', 'MediaPlayPause') }
    },
    {
      tooltip: 'Next',
      icon: path.join(__dirname, '/img/next.png'),
      click () { win.webContents.send('media-key', 'Next') }
    }
    
  ])
});

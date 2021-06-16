const {app, BrowserWindow, session, ipcMain, dialog, shell, Notification} = require('electron');
const path = require('path');
const url = require('url');
const {autoUpdater} = require("electron-updater");
const Nucleus = require('nucleus-nodejs');
const osLocale = require('os-locale');

Nucleus.init('6015572f67ba105405053ce4')

let win;
//let update;

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

  win.webContents.on('new-window', (event, url) => {
    event.preventDefault()
    const win = new BrowserWindow({icon: __dirname + '/img/saoxlogo.png',show: false,autoHideMenuBar: true})
    win.once('ready-to-show', () => win.show())
    win.loadURL(url)
    event.newGuest = win
    if(!url.includes('facebook')){
        shell.openExternal(url)
        win.close()
    }
  })
}

app.commandLine.appendSwitch('disable-site-isolation-trials')

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
  (async () => {
    console.log(await osLocale());
    if (await osLocale() != 'th-TH') {
      new Notification({ title: 'Update Available', body: 'Downloading...' }).show()
    }else{
      new Notification({ title: 'โปรแกรมมีอัพเดท', body: 'โอ้ว ไม่ต้องตกใจไป เราไม่ปิดโปรแกรมตอนนี้หรอกนะ เมื่อเราพร้อมเมื่อไร ก็จะอัพเดทเองแหละ' }).show()
    }
  })();
  //win.webContents.send('update_not_available');
});

autoUpdater.on('update-available', () => {
  //autoUpdater.downloadUpdate();
  //win.webContents.send('update_available');
});

autoUpdater.on('download-progress', () => {
  //win.webContents.send('incoming');
});

autoUpdater.on('update-downloaded', () => {
  (async () => {
    console.log(await osLocale());
    if (await osLocale() != 'th-TH') {
      new Notification({ title: 'Update Not Available' }).show()
    }else{
      new Notification({ title: 'โปรแกรมไม่มีอัพเดท' }).show()
    }
  })();
  //win.webContents.send('update_downloaded');
  //setTimeout(function(){ 
    //setTimeout(function(){autoUpdater.quitAndInstall(false,true);},15000);
  //}, 5000)
  //update = '1';
  //autoUpdater.quitAndInstall();
  //update = '1';
  //win.webContents.send('update_downloaded');
});

autoUpdater.on('error', (error) => {
  //if (error != ''){
    (async () => {
      console.log(await osLocale());
      if (await osLocale() != 'th-TH') {
        new Notification({ title: 'Update Error', body: error }).show()
      }else{
        new Notification({ title: 'อัพเดทมีปัญหา', body: error }).show()
      }
    })();    //win.webContents.send('error');
    //autoUpdater.checkForUpdatesAndNotify();
    autoUpdater.downloadUpdate();
  //}
});

/*autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox({
    title: 'Install Updates',
    message: 'Updates downloaded, application will be quit for update...'
  }, () => {
    setImmediate(() => autoUpdater.quitAndInstall())
  })
})*/

ipcMain.on('checkdamnupdate', () => {
  autoUpdater.checkForUpdatesAndNotify();
  //autoUpdater.downloadUpdate();
});

/*ipcMain.on('update_app', () => {
  autoUpdater.downloadUpdate();
});

ipcMain.on('restart_app', () => {
  //update = '1';
  //win.close();
  autoUpdater.quitAndInstall(false,true);
});*/

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
  Nucleus.appStarted()
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
    //if (update == '1'){
    //  autoUpdater.quitAndInstall();
    //}else{
      app.quit();
    //}
  }
});

//app.on('window-all-closed', app.quit);
//app.on('before-quit', () => {
  //globalShortcut.unregisterAll()
  //if (update == '1'){
    //autoUpdater.quitAndInstall();
  //}else{
    //win.removeAllListeners('close');
    //win.close();
  //}
  //win.removeAllListeners('close');
  //win.close();
//});

app.on('activate', function () {
  if (win === null) {
    Nucleus.appStarted()
    createWindow();
  }
});

/*app.on("web-contents-created", (webContentsCreatedEvent, contents)=>{
  contents.on("will-navigate", function(e, reqUrl) {
      console.log(`Popup is navigating to: ${reqUrl}`);
  });
});*/

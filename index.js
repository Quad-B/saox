const { app, BrowserWindow, session, ipcMain, dialog, shell, Notification } = require('electron');
const path = require('path');
const url = require('url');
const { autoUpdater } = require("electron-updater");
const Nucleus = require('nucleus-nodejs');
const osLocale = require('os-locale');

require('@electron/remote/main').initialize()

Nucleus.init('6015572f67ba105405053ce4')

let win;
let update = 0;
let ses;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    icon: __dirname + '/img/saoxlogo.png',
    width: 0,
    height: 0,
    minWidth: 800,
    minHeight: 800,
    frame: false,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true,
      enableRemoteModule: true,
      contextIsolation: false,
      webviewTag: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('test.html')
  //win.loadURL('https://facebook.com')

  win.on('closed', function () {
    win = null;
  });

  autoUpdater.autoDownload = false;

  autoUpdater.autoInstallOnAppQuit = true;

  if (app.isPackaged == true && app.getAppPath().toLowerCase().includes('temp') != true && app.getAppPath().toLowerCase().includes('snap') != true) {
    autoUpdater.checkForUpdatesAndNotify();
  }

  win.setThumbarButtons([
    {
      tooltip: 'Prev',
      icon: path.join(__dirname, '/img/previous.png'),
      click() { win.webContents.send('media-key', 'Prev') }
    },
    {
      tooltip: 'Play',
      icon: path.join(__dirname, '/img/play.png'),
      click() { win.webContents.send('media-key', 'MediaPlayPause') }
    },
    {
      tooltip: 'Next',
      icon: path.join(__dirname, '/img/next.png'),
      click() { win.webContents.send('media-key', 'Next') }
    }

  ])

  win.maximize();

  /*win.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });*/

  // Open the DevTools.
  /*win.webContents.openDevTools()

  session.defaultSession.cookies.get({}, (error, cookies) => {
    //console.log(error, cookies)
  });

  session.defaultSession.webRequest.onHeadersReceived(
    { urls: ['https://api.joox.com/*'] },
    (details, callback) => {
      if (
        details.responseHeaders &&
        details.responseHeaders['Set-Cookie'] &&
        details.responseHeaders['Set-Cookie'].length &&
        !details.responseHeaders['Set-Cookie'][0].includes('SameSite=none')
      ) {
        details.responseHeaders['Set-Cookie'][0] = details.responseHeaders['Set-Cookie'][0] + '; SameSite=none';
      }
        callback({ cancel: false, responseHeaders: details.responseHeaders });
    },
  );*/

  /*session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36';
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });*/

  /*win.webContents.on('new-window', (event, url, frameName, disposition, windowOptions) => {
    windowOptions['auto'] = false;
  });*/

  /*win.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures, referrer, postBody) => {
    event.preventDefault()
    const win = new BrowserWindow({
      webContents: options.webContents, // use existing webContents if provided
      show: false,
      webPreferences: {
        nodeIntegration: false
      }
    })
    win.once('ready-to-show', () => win.show())
    if (!options.webContents) {
      const loadOptions = {
        httpReferrer: referrer
      }
      if (postBody != null) {
        const { data, contentType, boundary } = postBody
        loadOptions.postData = postBody.data
        loadOptions.extraHeaders = `content-type: ${contentType}; boundary=${boundary}`
      }
  
      win.loadURL(url, loadOptions) // existing webContents will be navigated automatically
    }
    event.newGuest = win
  })*/

  /*win.webContents.on('new-window', (event, url) => {
    event.preventDefault()
    const win = new BrowserWindow({icon: __dirname + '/img/saoxlogo.png',show: false,autoHideMenuBar: true,webPreferences: {nodeIntegration: false}})
    win.once('ready-to-show', () => win.show())
    win.loadURL(url)
    event.newGuest = win
    if(!url.includes('facebook')){
        shell.openExternal(url)
        win.close()
    }
  })*/

  /*win.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures, referrer, postBody) => {
    event.preventDefault()
    const win = new BrowserWindow({
      show: false,
      webPreferences: {
        nodeIntegration: false
      }
    })
    win.once('ready-to-show', () => win.show())
    win.loadURL(url) // existing webContents will be navigated automatically
    event.newGuest = win
  })*/

  /*win.webContents.setWindowOpenHandler(({ url }) => {
    if (url === 'about:blank') {
      return {
        action: 'allow',
        overrideBrowserWindowOptions: {
          frame: false,
          fullscreenable: false,
          backgroundColor: 'black'
        }
      }
    }
    return { action: 'deny' }
  })*/

  /*win.webContents.on('new-window', (event, url, options, referrer, postBody, windowOptions) => {
    /*event.preventDefault()
    const win = new BrowserWindow({ icon: __dirname + '/img/saoxlogo.png', show: false, autoHideMenuBar: true, webPreferences: {nodeIntegration: false}})
    //const win = new BrowserWindow({ webContents: options.webContents, icon: __dirname + '/img/saoxlogo.png', show: false, autoHideMenuBar: true })
    win.once('ready-to-show', () => win.show())
    win.loadURL(url)*/

    /*win.once('ready-to-show', () => win.show())
    if (!options.webContents) {
      const loadOptions = {
        httpReferrer: referrer
      }
      if (postBody != null) {
        const { data, contentType, boundary } = postBody
        loadOptions.postData = postBody.data
        loadOptions.extraHeaders = `content-type: ${contentType}; boundary=${boundary}`
      }

      win.loadURL(url, loadOptions) // existing webContents will be navigated automatically
    }
    event.newGuest = win*/
    //console.log(url)
    //if (!url.includes('facebook')) {
    /*if (url.toLowerCase().includes('facebook') && (url.toLowerCase().includes('jooxsouthafrica') || url.toLowerCase().includes('jooxmy') || url.toLowerCase().includes('jooxid') || url.toLowerCase().includes('jooxth') || url.toLowerCase().includes('jooxmyanmar') || url.toLowerCase().includes('jooxhk'))) {
      event.preventDefault()
      shell.openExternal(url)
      //win.close()
    } else if (!url.includes('facebook') || (url.includes('facebook') && url.includes('share'))) {
      event.preventDefault()
      shell.openExternal(url)
      //win.close()
    } /*else {
      event.preventDefault()
      const win = new BrowserWindow({ icon: __dirname + '/img/saoxlogo.png', show: false, autoHideMenuBar: true, webPreferences: { nodeIntegration: false } })
      //const win = new BrowserWindow({ webContents: options.webContents, icon: __dirname + '/img/saoxlogo.png', show: false, autoHideMenuBar: true })
      //win.once('ready-to-show', () => win.show())
      //win.loadURL(url)

      win.once('ready-to-show', () => win.show())
      if (!options.webContents) {
        const loadOptions = {
          httpReferrer: referrer
        }
        if (postBody != null) {
          const { data, contentType, boundary } = postBody
          loadOptions.postData = postBody.data
          loadOptions.extraHeaders = `content-type: ${contentType}; boundary=${boundary}`
        }

        win.loadURL(url, loadOptions) // existing webContents will be navigated automatically
      }
      event.newGuest = win
    }*/
    //win.close()
    //}
    /*if(process.platform != "win32"){
      event.preventDefault()
      shell.openExternal(url)
    }
    if(process.platform != "win32"){
      shell.openExternal(url)
    }
  })*/

  require("@electron/remote/main").enable(win.webContents)
}

//app.commandLine.appendSwitch('disable-features', 'SameSiteByDefaultCookies')
//app.commandLine.appendSwitch('disable-site-isolation-trials')
//app.commandLine.appendSwitch('--disable-web-security')
//app.commandLine.appendSwitch('--allow-cross-origin-auth-prompt')

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
      new Notification({ title: 'You are use last version of SAOX' }).show()
    } else {
      new Notification({ title: 'โปรแกรมไม่มีอัพเดท' }).show()
    }
  })();
  //win.webContents.send('update_not_available');
});

autoUpdater.on('update-available', () => {
  (async () => {
    console.log(await osLocale());
    if (await osLocale() != 'th-TH') {
      new Notification({ title: 'SAOX has a updated' }).show()
    } else {
      new Notification({ title: 'โปรแกรมมีการอัพเดท' }).show()
    }
  })();
  autoUpdater.downloadUpdate();
  //win.webContents.send('update_available');
});

autoUpdater.on('error', (err) => {
  (async () => {
    console.log(await osLocale());
    if (await osLocale() != 'th-TH') {
      new Notification({ title: 'Update Error', body: err }).show()
    } else {
      new Notification({ title: 'อัพเดทมีปัญหา', body: err }).show()
    }
  })();    //win.webContents.send('error');
  //autoUpdater.checkForUpdatesAndNotify();
  //autoUpdater.downloadUpdate();
  update = 1
});

autoUpdater.on('update-downloaded', () => {
  (async () => {
    console.log(await osLocale());
    if (await osLocale() == 'th-TH') {
      new Notification({ title: 'ดาวน์โหลดอัพเดทสำเร็จ' }).show()
    }
  })();
  update = 1
  /*dialog.showMessageBox({
    title: 'Install Updates',
    message: 'Updates downloaded, application will be quit for update...'
  }, () => {
    setImmediate(() => autoUpdater.quitAndInstall())
  })*/
})

ipcMain.on('checkdamnupdate', () => {
  autoUpdater.checkForUpdatesAndNotify();
  //autoUpdater.downloadUpdate();
});

ipcMain.on('tryquitandupdate', () => {
  if (update == 1) {
    autoUpdater.quitAndInstall(false, true);
  } else {
    (async () => {
      console.log(await osLocale());
      if (await osLocale() == 'th-TH') {
        new Notification({ title: 'ไม่มีการอัพเดตหรือตรวจสอบการอัปเดตก่อนจะใช้คำสั่งนี้' }).show()
      } else {
        new Notification({ title: 'You use last version of SAOX or Check For Update Before use this method' }).show()
      }
    })();
  }
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
      click() { win.webContents.send('media-key', 'Prev') }
    },
    {
      tooltip: 'Play',
      icon: path.join(__dirname, '/img/play.png'),
      click() { win.webContents.send('media-key', 'MediaPlayPause') }
    },
    {
      tooltip: 'Next',
      icon: path.join(__dirname, '/img/next.png'),
      click() { win.webContents.send('media-key', 'Next') }
    }

  ])
});

ipcMain.on('play', () => {
  win.setThumbarButtons([
    {
      tooltip: 'Prev',
      icon: path.join(__dirname, '/img/previous.png'),
      click() { win.webContents.send('media-key', 'Prev') }
    },
    {
      tooltip: 'Pause',
      icon: path.join(__dirname, '/img/pause.png'),
      click() { win.webContents.send('media-key', 'MediaPlayPause') }
    },
    {
      tooltip: 'Next',
      icon: path.join(__dirname, '/img/next.png'),
      click() { win.webContents.send('media-key', 'Next') }
    }

  ])
});

ipcMain.on('window-minimize', function (event) {
  BrowserWindow.fromWebContents(event.sender).minimize();
})

ipcMain.on('window-maximize', function (event) {
  const window = BrowserWindow.fromWebContents(event.sender);
  window.isMaximized() ? window.unmaximize() : window.maximize();
})

ipcMain.on('window-close', function (event) {
  BrowserWindow.fromWebContents(event.sender).close()
})

ipcMain.on('window-is-maximized', function (event) {
  event.returnValue = BrowserWindow.fromWebContents(event.sender).isMaximized()
})

ipcMain.on('menu-event', (event, commandId) => {
  const menu = Menu.getApplicationMenu();
  const item = getMenuItemByCommandId(commandId, menu);
  item?.click(undefined, BrowserWindow.fromWebContents(event.sender), event.sender);
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

/*app.on('ready', function () {
  Nucleus.appStarted()
  createWindow();
  process.env.GOOGLE_API_KEY = Buffer.from("QUl6YVN5RGtLSEpqa1h5c29uT2l5VWxrbUFHR2xkemRQQzZfZmY0", 'base64').toString('ascii')
});*/

// Quit when all windows are closed.
/*app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})*/

app.whenReady().then(() => {
  Nucleus.appStarted()
  createWindow()
  process.env.GOOGLE_API_KEY = Buffer.from("QUl6YVN5RGtLSEpqa1h5c29uT2l5VWxrbUFHR2xkemRQQzZfZmY0", 'base64').toString('ascii')

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      Nucleus.appStarted()
      createWindow()
      process.env.GOOGLE_API_KEY = Buffer.from("QUl6YVN5RGtLSEpqa1h5c29uT2l5VWxrbUFHR2xkemRQQzZfZmY0", 'base64').toString('ascii')
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

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

/*app.on('activate', function () {
  if (win === null) {
    Nucleus.appStarted()
    createWindow();
  }
});

app.on("web-contents-created", (webContentsCreatedEvent, contents)=>{
  contents.on("will-navigate", function(e, reqUrl) {
      console.log(`Popup is navigating to: ${reqUrl}`);
  });
});*/

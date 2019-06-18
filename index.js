const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const {session} = require('electron');

// init win
let win;

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
	app.quit()
  } else {

function createWindow() {
	// Create browser window
	win = new BrowserWindow({
	icon:__dirname+'/img/saoxlogo.png',
	darkTheme: true,
	minWidth: 1000,
	minHeight: 700,
	autoHideMenuBar: true,
	webPreferences: { sandbox: true }
});
	// Load index.html
	win.loadURL('https://www.joox.com/th');

	win.maximize();

	session.defaultSession.cookies.get({}, (error, cookies) => {
  	console.log(error, cookies)
	});

	//win.webContents.on('did-finish-load', function() {
		//win.webContents.insertCSS('.sn-header{ display: none;} .logo a {background: url(https://raw.githubusercontent.com/boyphongsakorn/saox/master/img/weblogo.png) no-repeat  !important;background: url(https://raw.githubusercontent.com/boyphongsakorn/saox/master/img/weblogo.png) no-repeat,-webkit-gradient(linear,left top,left bottom,from(transparent),to(transparent))  !important;background: url(https://raw.githubusercontent.com/boyphongsakorn/saox/master/img/weblogo.png) no-repeat,-webkit-linear-gradient(transparent,transparent) !important;background: url(https://raw.githubusercontent.com/boyphongsakorn/saox/master/img/weblogo.png) no-repeat,linear-gradient(transparent,transparent)  !important;} .modal__footer--fb-login .dialog-login__button:last-child {float: inherit !important;}');
	//});

}

app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })

// Run create window function
app.on('ready', createWindow);

  }

// Quit when all windows are closed
app.on('window-all-closed', () => {
	if(process.platform !== 'darwin'){
		app.quit();
	}
});

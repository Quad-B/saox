const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const {session} = require('electron');

// init win
let win;

function createWindow() {
	// Create browser window
	win = new BrowserWindow({
    width: 800,
    height: 600,
    icon:__dirname+'/img/saoxlogo.png'
});

	// Load index.html
	win.loadURL('http://music.sanook.com/music');

	win.maximize();

	session.defaultSession.cookies.get({}, (error, cookies) => {
  	console.log(error, cookies)
	});

	win.webContents.on('did-finish-load', function() {
 	win.webContents.insertCSS('.sn-header{ display: none;} .logo a {background: url(https://www.img.in.th/images/d23f00e75c0ffbd1a8f4f3dbc8cabe33.png) no-repeat  !important;background: url(https://www.img.in.th/images/d23f00e75c0ffbd1a8f4f3dbc8cabe33.png) no-repeat,-webkit-gradient(linear,left top,left bottom,from(transparent),to(transparent))  !important;background: url(https://www.img.in.th/images/d23f00e75c0ffbd1a8f4f3dbc8cabe33.png) no-repeat,-webkit-linear-gradient(transparent,transparent) !important;background: url(https://www.img.in.th/images/d23f00e75c0ffbd1a8f4f3dbc8cabe33.png) no-repeat,linear-gradient(transparent,transparent)  !important;} .dialog-login__button--fb {display: none !important;} .modal__footer--fb-login .dialog-login__button:last-child {float: inherit !important;}');
	});
}

// Run create window function
app.on('ready', createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
	if(process.platform !== 'darwin'){
		app.quit();
	}
});
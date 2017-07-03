const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const {session} = require('electron');

// init win
let win;

function createWindow() {
	// Create browser window
	win = new BrowserWindow({width:800, height:600, icon:__dirname+'/img/saoxlogo.png'})

	// Load index.html
	win.loadURL('http://music.sanook.com');

	win.webContents.on('did-finish-load', function() {
 	win.webContents.insertCSS('.sn-header{ display: none;} .modal__footer--fb-login .dialog-login__button:last-child {float: initial !important;}')
	});

	win.webContents.on('new-window', (event, url) => {
  	event.preventDefault()
  	const win = new BrowserWindow({show: false})
  	win.once('ready-to-show', () => win.show())
  	win.loadURL(url)
	session.defaultSession.cookies.get({}, (error, cookies) => {
  	console.log(error, cookies)
	});
  	event.newGuest = win
	});

	session.defaultSession.cookies.get({}, (error, cookies) => {
  	console.log(error, cookies)
	});
}

// Run create window function
app.on('ready', createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
	if(process.platform !== 'win32'){
		app.quit();
	}
});
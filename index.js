const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

// init win
let win;

function createWindow() {
	// Create browser window
	win = new BrowserWindow({width:800, height:600, icon:__dirname+'/img/saoxlogo.png'})

	// Load index.html
	win.loadURL('http://music.sanook.com/music/');

	win.webContents.on('new-window', function(e, url) {
  	e.preventDefault();
  	require('electron').shell.openExternal(url);
	});

	win.webContents.on('did-finish-load', function() {
 	win.webContents.insertCSS('.sn-header{ display: none;}')
	});

	win.on('closed', () => {
		win = null;
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
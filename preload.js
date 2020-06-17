const _setImmediate = setImmediate
const _clearImmediate = clearImmediate
process.once('loaded', () => {
    global.setImmediate = _setImmediate
    global.clearImmediate = _clearImmediate

    const customTitlebar = require('custom-electron-titlebar');
 
    new customTitlebar.Titlebar({
        backgroundColor: customTitlebar.Color.fromHex('#444')
    });
})
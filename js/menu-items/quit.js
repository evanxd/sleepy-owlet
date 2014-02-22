'use strict';
// Lode modules.
var gui = nwrequire('nw.gui');
var quitMenuItem = new gui.MenuItem({ label: 'Quit' });

quitMenuItem.on('click', function() {
  gui.App.quit();
});

module.exports = quitMenuItem;

'use strict';
// Lode modules.
var gui = nwrequire('nw.gui');
var quitMenuItem = new gui.MenuItem({ label: 'Quit' });

quitMenuItem.on('click', function() {
  console.log('quit');
});

module.exports = quitMenuItem;

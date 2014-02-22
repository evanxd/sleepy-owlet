'use strict';
// Lode modules.
var gui = nwrequire('nw.gui');
var aboutMenuItem = new gui.MenuItem({ label: 'About' });

aboutMenuItem.on('click', function() {
  console.log('about');
});

module.exports = aboutMenuItem;

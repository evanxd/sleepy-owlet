'use strict';
// Lode modules.
var gui = nwrequire('nw.gui');
var preferencesMenuItem = new gui.MenuItem({ label: 'Preferences' });

preferencesMenuItem.on('click', function() {
  console.log('preferences');
});

module.exports = preferencesMenuItem;

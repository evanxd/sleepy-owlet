'use strict';
// Lode modules.
var gui = nwrequire('nw.gui');
var feedbackMenuItem = new gui.MenuItem({ label: 'Feedback' });

feedbackMenuItem.on('click', function() {
  console.log('feedback');
});

module.exports = feedbackMenuItem;

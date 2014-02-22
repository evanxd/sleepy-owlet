'use strict';

/**
 * Main function.
 */
(function() {
  // Lode modules.
  var gui = require('nw.gui'),
      Timer = require('./js/timer');

  // to solve context problems
  global.nwrequire = require;

  // Define Native UI.
  var tray = new gui.Tray({ title: 'Owlet' }),
      menu = new gui.Menu(),
      preferencesMenuItem = require('./js/menu-items/preferences'),
      feedbackMenuItem = require('./js/menu-items/feedback'),
      aboutMenuItem = require('./js/menu-items/about'),
      quitMenuItem = require('./js/menu-items/quit'),
      separatorBelowPreferencesMenuItem =
        require('./js/menu-items/separator_below_preferences'),
      separatorBelowAboutMenuItem =
        require('./js/menu-items/separator_below_about');

  var timer = new Timer(window);

  menu.append(preferencesMenuItem);
  menu.append(separatorBelowPreferencesMenuItem);
  menu.append(feedbackMenuItem);
  menu.append(aboutMenuItem);
  menu.append(separatorBelowAboutMenuItem);
  menu.append(quitMenuItem);
  tray.menu = menu;

  // XXX: Workaround to repeat the work and rest cycle.
  doWorkAndRestCycle(doWorkAndRestCycle);
  function doWorkAndRestCycle(recursiveCallback) {
    timer.setupWorkTimer(function() {
      console.log('Hi dear, you should take a rest.');
      timer.clearWorkTimer();

      timer.setupRestTimer(function() {
        console.log('Hi dear, go back to work, cheer!');
        timer.clearRestTimer();
        // Do work and rest cycle again and again.
        recursiveCallback(recursiveCallback);
      });
    });
  }
})();

'use strict';

// Avoid being collected by GC,
// or after some time and icon will disappear
var systemTray = null;

/**
 * Main function.
 */
(function() {
  // to solve context problems
  global.nwrequire = require;

  // Lode modules.
  var gui = require('nw.gui'),
      moment = require('moment'),
      Timer = require('./js/timer');

  var TIME_TO_SHOW_TIMER = 300000;

  // Define Native UI.
  var win = null,
      menu = new gui.Menu(),
      preferencesMenuItem = require('./js/menu-items/preferences'),
      feedbackMenuItem = require('./js/menu-items/feedback'),
      aboutMenuItem = require('./js/menu-items/about'),
      quitMenuItem = require('./js/menu-items/quit'),
      separatorBelowPreferencesMenuItem =
        new gui.MenuItem({ type: 'separator' }),
      separatorBelowAboutMenuItem = new gui.MenuItem({ type: 'separator' });
  // It is a global variable, because of GC issue.
  systemTray = new gui.Tray({ title: 'Owlet' });

  var timer = new Timer(window);

  menu.append(preferencesMenuItem);
  menu.append(separatorBelowPreferencesMenuItem);
  menu.append(feedbackMenuItem);
  menu.append(aboutMenuItem);
  menu.append(separatorBelowAboutMenuItem);
  menu.append(quitMenuItem);
  systemTray.menu = menu;

  // XXX: Workaround to repeat the work and rest cycle.
  doWorkAndRestCycle(doWorkAndRestCycle);
  function doWorkAndRestCycle(recursiveCallback) {
    systemTray.title = 'Owlet';

    timer.setupWorkTimer(function() {
      if (!win) {
        // XXX: node-webkit issue:
        // We need to do { 'toolbar': false } to enter kiosk mode, or crash.
        win = gui.Window.open('http://www.mozilla.org', {
          'toolbar': false
        });
      }
      // Notice users to take a rest.
      win.show();
      win.enterKioskMode();
      timer.clearWorkTimer();

      timer.setupRestTimer(function() {
        // Could go back to work.
        win.leaveKioskMode();
        win.hide();
        timer.clearRestTimer();
        // Do work and rest cycle again and again.
        recursiveCallback(recursiveCallback);
      });
    });
  }

  // XXX: Bad code to show remaining time on system tray.
  showRemainingTime();
  function showRemainingTime() {
    var remainingTime = timer.getRemainingTime();
    if (remainingTime >= 0 && remainingTime <= TIME_TO_SHOW_TIMER) {
      systemTray.title = moment(remainingTime).format('mm:ss');
    }
    setTimeout(showRemainingTime, 1000);
  }
})();

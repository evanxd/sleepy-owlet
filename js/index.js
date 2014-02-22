'use strict';

/**
 * Main function.
 */
(function() {
  // Lode modules.
  var gui = require('nw.gui'),
      Timer = require('./js/timer');

  // Define Native UI.
  var tray = new gui.Tray({ title: 'Owlet' }),
      menu = new gui.Menu(),
      preferences = new gui.MenuItem({ label: 'Preferences' }),
      separatorBelowPreferences = new gui.MenuItem({ type: 'separator' }),
      sendFeedback = new gui.MenuItem({ label: 'Send Feedback' }),
      about = new gui.MenuItem({ label: 'About' }),
      separatorBelowAbout = new gui.MenuItem({ type: 'separator' }),
      quit = new gui.MenuItem({ label: 'Quit' });

  var timer = new Timer(window);

  preferences.on('click', function() {
    console.log('preferences');
  });

  sendFeedback.on('click', function() {
    console.log('sendFeedback');
  });

  about.on('click', function() {
    console.log('about');
  });

  quit.on('click', function() {
    console.log('quit');
  });

  menu.append(preferences);
  menu.append(separatorBelowPreferences);
  menu.append(sendFeedback);
  menu.append(about);
  menu.append(separatorBelowAbout);
  menu.append(quit);
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

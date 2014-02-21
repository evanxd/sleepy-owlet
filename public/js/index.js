/**
 * Main function.
 */
(function() {
  // Lode modules.
  var gui = require('nw.gui');
  // Define Native UI.
  var tray = new gui.Tray({ title: 'Owlet' }),
      menu = new gui.Menu(),
      preferences = new gui.MenuItem({ label: 'Preferences' }),
      separatorBelowPreferences = new gui.MenuItem({ type: 'separator' }),
      sendFeedback = new gui.MenuItem({ label: 'Send Feedback' }),
      about = new gui.MenuItem({ label: 'About' }),
      separatorBelowAbout = new gui.MenuItem({ type: 'separator' }),
      quit = new gui.MenuItem({ label: 'Quit' });

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
})();

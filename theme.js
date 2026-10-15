/* Light/dark theme toggle for stefandietrich.org.
   Light is the default; a visitor's own choice is remembered on their device.
   Loaded in <head> without defer so the theme is set before the page paints. */
(function () {
  var root = document.documentElement;
  var KEY = 'theme';

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  root.setAttribute('data-theme', stored() === 'dark' ? 'dark' : 'light');

  function sync() {
    var current = root.getAttribute('data-theme');
    var buttons = document.querySelectorAll('[data-theme-set]');
    for (var i = 0; i < buttons.length; i++) {
      var on = buttons[i].getAttribute('data-theme-set') === current;
      buttons[i].setAttribute('aria-pressed', on ? 'true' : 'false');
    }
  }

  function choose(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem(KEY, theme); } catch (e) {}
    sync();
  }

  document.addEventListener('DOMContentLoaded', function () {
    var buttons = document.querySelectorAll('[data-theme-set]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        choose(this.getAttribute('data-theme-set'));
      });
    }
    sync();
  });
})();

// Classic (non-module) script so the theme is applied before first paint; the page's CSP forbids inline scripts.
// Order of precedence: the user's saved choice, then the host app's colour mode, then the operating-system preference.
(function () {
  var root = document.documentElement;
  var KEY = 'tub-theme';

  function saved() {
    try { var v = localStorage.getItem(KEY); return v === 'light' || v === 'dark' ? v : null; } catch (e) { return null; }
  }
  function host() {
    var v = root.getAttribute('data-color-mode');
    return v === 'light' || v === 'dark' ? v : null;
  }
  function system() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function apply() {
    var next = saved() || host() || system();
    if (root.getAttribute('data-theme') !== next) root.setAttribute('data-theme', next);
  }

  apply();

  // Follow the host and the OS until the user picks a theme explicitly.
  new MutationObserver(function () { if (!saved()) apply(); }).observe(root, { attributes: true, attributeFilter: ['data-color-mode'] });
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function () { if (!saved()) apply(); };
    if (mq.addEventListener) mq.addEventListener('change', onChange); else if (mq.addListener) mq.addListener(onChange);
  }

  window.__tubTheme = {
    current: function () { return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'; },
    set: function (value) {
      try { localStorage.setItem(KEY, value); } catch (e) { /* storage unavailable: the choice lasts for this page only */ }
      root.setAttribute('data-theme', value);
    },
  };
})();

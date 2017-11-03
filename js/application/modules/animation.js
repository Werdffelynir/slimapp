App.namespace('Animation', function(app) {

  /**
   * @type {NamespaceApplication|App}
   */
  var App = app;

  /**
   * @namespace App.Animation
   */
  var _ = {};

  /**
   * @namespace App.Animation.run
   */
  _.run = function(){
    if ('particlesJS' in window) {

      /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
      particlesJS.load('particles-js', '/js/assets/particles.json', function() {
        console.log('callback - particles.js config loaded');
      });

    } else {

      if (App.debug)
        console.error('particlesJS not loaded!');

      App.Timer.timeout(_.run, 5000);
    }
  };

  return _;
});
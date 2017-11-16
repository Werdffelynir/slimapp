(function () {
  if ('NamespaceApplication' in window) {
    NamespaceApplication.domLoaded(function () {

      var App = new NamespaceApplication({
        url: '/',
        name: '36.6',
        debug: true,
        node: {}
      });

      App.require('actions',
        [
          App.url + 'js/application/modules/animation.js',
          App.url + 'js/application/modules/emailform.js',
        ],
        function (list){
          App.node = App.search('[id^=app-]', 'id');

          App.Animation.run();
          App.EmailForm.run();

        },
        function (error){
          console.error('It can not load important scripts! >>');
          console.error(error);
        }).requireStart('actions');

      window.App = App;

    });
  }
})();
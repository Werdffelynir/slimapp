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

          console.log(App.node);
        },
        function (error){
          console.error('It can not load important scripts! >>');
          console.error(error);
        }).requireStart('actions');

      window.App = App;

    });
  }
})();


// console.log(list);
// console.log(App);
// App.Animation.run();
// App.EmailForm.run();
/*
var i = 0;
var update = function() {
  i ++;
  App.inject('h1', i);

  requestAnimationFrame(update);
};
requestAnimationFrame(update);*/

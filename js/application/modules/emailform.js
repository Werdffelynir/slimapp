App.namespace('EmailForm', function(app) {

  /**
   * @type {NamespaceApplication|App}
   */
  var App = app;

  /**
   * @namespace App.EmailForm
   */
  var _ = {};

  /**
   * @namespace App.EmailForm.run
   */
  _.run = function(){

    var buttonSend = App.node['app-contact-button'];
    buttonSend.readySend = false;

    buttonSend.onclick = function (event) {
      if (buttonSend.readySend) {
        var formFields = {
          field3: App.query('textarea', App.node['app-contact-form']).value
        };

        App.each(App.search('input', 'name', App.node['app-contact-form']), function (input, name) {
          formFields[name] = input.value;
        });

        console.log('formFields >> ', formFields);
        App.ajax({method: 'POST', url: '/send', data: formFields}, function (status, data) {
          console.log('send >> ', status, data);
        });

      } else {
        event.target.classList.add('animated-contact-button');
        App.Timer.timeout(function () {
          buttonSend.readySend = true;
          App.node['app-contact-form'].style.opacity = 1;
          App.node['app-contact-form'].style.display = 'block';
          App.node['app-contact-form'].classList.add('flipInX');
          App.node['app-contact-form'].classList.add('animated');
          event.target.innerHTML = "SEND";
        }, 500);
      }
    };


  };

  return _;
});
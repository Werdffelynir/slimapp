App.namespace('EmailForm', function (app) {

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
  _.run = function () {

    var btnOpen = App.node['app-contact-button'];
    var btnSend = App.node['app-contact-send'];
    var form = App.node['app-contact-form'];
    var inputs = App.queryAll('.animated', form);


    var startAnimation = function (item, classname, delay) {
      setTimeout(function () {
        item.classList.add(classname);
      }, delay || 1000)
    };
    var clearAnimation = function (item, classname) {
      if (arguments.length == 2) {
        item.classList.remove(classname);
      } else
        item.className = '';
    };


    var loaderOn = function () {
      App.css('.loader', {
        top: '0',
        display: 'block',
        width: App.position('#app-contact-form').width + 'px',
        height: App.position('#app-contact-form').height + 'px'
      });
    };
    var loaderOff = function () {
      App.hide('.loader');
    };
    var loaderOk = function () {
      App.inject('.loader', '<img class="animated" src="/images/ok.png">');
      App.query('img', '.loader').classList.add('flipInX');
      App.query('img', '.loader').style.opacity = 1;
    };


    App.on(btnOpen, 'click', function () {
      if (!btnOpen.opened) {
        btnOpen.opened = true;
        inputs.map(function (it, i) {
          startAnimation(it, 'fadeInDown', (i + 1) * 300);
        });
        App.css(btnOpen, {cursor: 'auto', 'background': '#ddd'});
      }
    });


    App.on(btnSend, 'click', function () {
      if (!btnSend.sended) {
        var ok = true, ffs = {field4: App.query('textarea', App.node['app-contact-form']).value};

        App.each(App.search('input', 'name', App.node['app-contact-form']), function (input, name) {
          ffs[name] = input.value;
          if (input.value.length < 2) {
            input.style.borderColor = '#C00000';
            ok = false;
          } else {
            input.style.borderColor = '#b8b8b8';
          }
        });

        if (ok) {
          loaderOn();
          btnSend.sended = true;

          App.ajax({
            method: 'POST',
            url: '/send',
            useFormData: false,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: ffs
          }, function (status, data) {
            data = JSON.parse(data);
            if (data.status === 0) {
              loaderOk();
            } else {
              loaderOff();
              btnSend.sended = false;
              console.error(data);
            }
          });
        }
      }


    });

  };

  return _;
});
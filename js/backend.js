'use strict';

(function () {

  var URL_FROM = 'https://javascript.pages.academy/code-and-magick/data';
  var URL_TO = 'https://javascript.pages.academy/code-and-magick';

  var StatusCode = {
    ok: 200
  };

  var TIMEOUT_IN_MS = 10000;

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.ok) {
        onLoad(xhr.response);
      } else {
        onError('что-то пошло не так');
      }
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за' + xhr.timeout + 'мс');
    });

    xhr.open('GET', URL_FROM);
    xhr.send();
  };


  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.ok) {
        onLoad(xhr.response);
      } else {
        onError('К сожалению, что-то пошло не так');
      }
    });
    xhr.open('POST', URL_TO);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();

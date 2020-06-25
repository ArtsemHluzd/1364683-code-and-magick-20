'use strict';

(function () {

  var URL_FROM = 'https://javascript.pages.academy/code-and-magick/data';
  var URL_TO = 'https://javascript.pages.academy/code-and-magick';
  xhr.timeout = TIMEOUT_IN_MS;

  var StatusCode = {
    ok: 200
  };

  var TIMEOUT_IN_MS = 10000;

  window.backend = {};

  window.backend.onLoad = function (data) {
    console.log(data);
  };

  window.backend.onError = function (errorMessage) {
    console.log(errorMessage);
  };

  window.backend.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('что-то пошло не так');
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за' + xhr.timeout + 'мс');
    });

    xhr.open('GET', URL_FROM);
    xhr.send();
  };


  window.backend.save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('К сожалению, что-то произошло');
      }
    });
    xhr.open('POST', URL_TO);
    xhr.send(data);
  };
})();

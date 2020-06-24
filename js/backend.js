'use strict';

(function () {

  var URL_FROM = "https://javascript.pages.academy/code-and-magick/data";
  var URL_TO = "https://javascript.pages.academy/code-and-magick";

  var onLoad = function (data) {

  };

  var onError = function (errorMessage) {

  };

  window.backend.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === "200") {
        onLoad(xhr.response));
      } else {
        onError('К сожалению, что-то произошло');
      }

      xhr.open('POST', URL_TO);
      xhr.send(data);
    });

  });

  window.backend.save = function (data, onLoad, onError) {

  };

})();

'use strict';

(function () {

  var WIZZARDS_NUMBER = 4;
  var similarList = document.querySelector('.setup-similar-list');

  var onLoad = function (wizzards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZZARDS_NUMBER; i++) {
      fragment.appendChild(window.setup.renderWizzard(wizzards[i]));
    }
    similarList.appendChild(fragment);
    window.setup.userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(onLoad, onError);


})();

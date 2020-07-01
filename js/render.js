'use strict';

(function () {

  var WIZZARDS_NUMBER = 4;
  var similarList = document.querySelector('.setup-similar-list');
  var wizzards = [];
  var coatColor = 'rgb(101, 137, 164)';
  var eyesColor = 'black';

  var wizzardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizzardCoatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var wizzardEyes = document.querySelector('.wizard-eyes');
  var wizzardEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

  var getRandomInt = function (min, max) {
    return Math.round(Math.random() * (max - min) + 1);
  };

  var generateElement = function (arr) {
    var random = getRandomInt(0, arr.length - 2);
    return arr[random];
  };

  var changeWizzardCoatColor = function () {
    var newColor = generateElement(wizzardCoatColor);
    wizzardCoat.style = 'fill: ' + coatColor;
    coatColor = newColor;
    updateWizzards();
  };

  var changeWizzardEyes = function () {
    var newColor = generateElement(wizzardEyesColors);
    wizzardEyes.style = 'fill: ' + eyesColor;
    eyesColor = newColor;
    updateWizzards();
  };

  var updateWizzards = function () {
    var samecoatWizard = wizzards.filter(function (it) {
      return it.colorCoat === coatColor;
    });
    window.setup.renderWizzard(samecoatWizard);
  };

  wizzardCoat.addEventListener('click', changeWizzardCoatColor);
  wizzardEyes.addEventListener('click', changeWizzardEyes);

  var onLoad = function (data) {

    wizzards = data;
    // var fragment = document.createDocumentFragment();
    // for (var i = 0; i < WIZZARDS_NUMBER; i++) {
    //   fragment.appendChild(window.setup.renderWizzard(wizzards[i]));
    // }
    // similarList.appendChild(fragment);
    // window.setup.userDialog.querySelector('.setup-similar').classList.remove('hidden');
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

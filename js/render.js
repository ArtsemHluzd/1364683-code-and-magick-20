'use strict';

(function () {

  var wizzards = [];
  var coatColor = 'rgb(101, 137, 164)';
  var eyesColor = 'black';

  var wizzardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizzardCoatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var wizzardEyes = document.querySelector('.wizard-eyes');
  var wizzardEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

  var WIZZARDS_NUMBER = 4;
  var similarList = document.querySelector('.setup-similar-list');

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

  var getRank = function (wizzard) {
    var rank = 0;

    if (wizzard.colorCoat === coatColor) {
      rank += 2;
    }

    if (wizzard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var updateWizzards = function () {

    window.setup.userDialog.querySelector('.setup-similar').classList.remove('hidden');

    var sameCoatAndEyesWizard = wizzards.filter(function (it) {
      return it.colorCoat === coatColor && it.colorEyes === eyesColor;
    });
    var sameCoatWizzard = wizzards.filter(function (it) {
      return it.colorCoat === coatColor;
    });
    var sameEyesWizzard = wizzards.filter(function (it) {
      return it.colorEyes === eyesColor;
    });

    var filteredWizards = sameCoatAndEyesWizard;
    filteredWizards = filteredWizards.concat(sameCoatWizzard);
    filteredWizards = filteredWizards.concat(sameEyesWizzard);
    filteredWizards = filteredWizards.concat(wizzards);

    var uniqWizards = filteredWizards.filter(function (it, i) {
      return filteredWizards.indexOf(it) === i;
    });

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZZARDS_NUMBER; i++) {
      var similarItem = window.setup.renderWizzard(uniqWizards[i]);
      fragment.appendChild(similarItem);
    }
    similarList.appendChild(fragment);
  };

  wizzardCoat.addEventListener('click', changeWizzardCoatColor);
  wizzardEyes.addEventListener('click', changeWizzardEyes);

  var onLoad = function (data) {

    wizzards = data;
    updateWizzards();
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

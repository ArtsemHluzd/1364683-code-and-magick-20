'use strict';

(function () {

  var userDialog = document.querySelector('.setup');
  var setupOpenBtn = document.querySelector('.setup-open');
  var setupCloseBtn = userDialog.querySelector('.setup-close');
  var setupOpenIcon = document.querySelector('.setup-open-icon');
  var inputUserName = document.querySelector('.setup-user-name');
  var setupSubmit = document.querySelector('.setup-submit');
  var setupForm = document.querySelector('.setup-wizard-form');
  var wizzardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizzardCoatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var wizzardEyes = document.querySelector('.wizard-eyes');
  var wizzardEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
  var fireBall = document.querySelector('.setup-fireball-wrap');
  var fireBallColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var fireBallInput = document.querySelector('.setup-fireball-input');
  var similarList = document.querySelector('.setup-similar-list');

  var getRandomInt = function (min, max) {
    return Math.round(Math.random() * (max - min) + 1);
  };

  var generateElement = function (arr) {
    var random = getRandomInt(0, arr.length - 2);
    return arr[random];
  };

  var onPopupEscPress = function (evt) {
    if (document.activeElement !== inputUserName) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeUserDialog();
      }
    }
  };

  var onPopupCloseEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      closeUserDialog();
    }
  };


  var onPopupSubmitEnterPres = function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      setupForm.submit();
    }
  };

  var onPopupSubmitEnterClick = function () {
    setupForm.submit();
  };

  var changeWizzardCoatColor = function () {
    wizzardCoat.style = 'fill: ' + generateElement(wizzardCoatColor);
  };

  var changeWizzardEyes = function () {
    wizzardEyes.style = 'fill: ' + generateElement(wizzardEyesColors);
  };

  var changeFireBallBackground = function () {
    var color = generateElement(fireBallColors);
    fireBall.style.backgroundColor = color;
    fireBallInput.value = color;
  };

  var openUserDialog = function () {
    userDialog.classList.remove('hidden');
    document.querySelector('.setup-similar').classList.remove('hidden');
    setupCloseBtn.addEventListener('click', closeUserDialog);
    document.addEventListener('keydown', onPopupEscPress);
    setupCloseBtn.addEventListener('keydown', onPopupCloseEnterPress);
    setupSubmit.addEventListener('keydown', onPopupSubmitEnterPres);
    setupSubmit.addEventListener('click', onPopupSubmitEnterClick);
    wizzardCoat.addEventListener('click', changeWizzardCoatColor);
    wizzardEyes.addEventListener('click', changeWizzardEyes);
    fireBall.addEventListener('click', changeFireBallBackground);
    userDialog.style.top = 80 + 'px';
    userDialog.style.left = 50 + '%';
  };

  var closeUserDialog = function () {
    userDialog.classList.add('hidden');
    setupCloseBtn.removeEventListener('click', closeUserDialog);
    document.removeEventListener('keydown', onPopupEscPress);
    setupCloseBtn.removeEventListener('keydown', onPopupCloseEnterPress);
    setupSubmit.removeEventListener('keydown', onPopupSubmitEnterPres);
    setupSubmit.removeEventListener('click', onPopupSubmitEnterClick);
    wizzardCoat.removeEventListener('click', changeWizzardCoatColor);
    wizzardEyes.removeEventListener('click', changeWizzardEyes);
    fireBall.removeEventListener('click', changeFireBallBackground);
  };

  var renderWizzard = function (wizzard) {
    var similarItemTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

    var similarItem = similarItemTemplate.cloneNode(true);
    var wizzardName = similarItem.querySelector('.setup-similar-label');
    wizzardName.textContent = wizzard.name;
    var wizardCoat = similarItem.querySelector('.wizard-coat');
    wizardCoat.style.fill = wizzard.coatColor;
    var wizardEyes = similarItem.querySelector('.wizard-eyes');
    wizardEyes.style.fill = wizzard.coatEyes;
    return similarItem;
  };

  setupOpenIcon.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      openUserDialog();
    }
  });

  setupOpenBtn.addEventListener('click', function () {
    openUserDialog();
  });

  var onLoad = function (wizzards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizzards.length; i++) {
      fragment.appendChild(renderWizzard(wizzards[i]));
    }
    similarList.appendChild(fragment);
    userDialog.querySelector('.setup-similar').classList.remove('hidden');
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

  window.load(onLoad, onError);

  setupForm.addEventListener('submit', function (evt) {
    window.save(new FormData(setupForm), onLoad, onError);
    evt.preventDefault();
  });

  window.setup = {
    userDialog: userDialog,
    setupForm: setupForm
  };

})();

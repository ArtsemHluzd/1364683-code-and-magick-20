'use strict';

(function () {

  var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var coatColorArr = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var eyesColorArr = ['black', 'red', 'blue', 'yellow', 'green'];

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

  var createWizzards = function (nameArr, surnameArr, coatColors, eyesColors) {
    var wizzards = [];
    for (var i = 0; i < nameArr.length; i++) {

      var name = generateElement(nameArr) + ' ' + generateElement(surnameArr);
      var coatColor = generateElement(coatColors);
      var eyesColor = generateElement(eyesColors);

      wizzards[i] = {
        name: name,
        coatColor: coatColor,
        eyesColor: eyesColor
      };
    }
    return wizzards;
  };

  var renderWizzards = function (wizzards) {
    var similarList = document.querySelector('.setup-similar-list');
    var similarItemTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
      var similarItem = similarItemTemplate.cloneNode(true);
      var wizzardName = similarItem.querySelector('.setup-similar-label');
      wizzardName.textContent = wizzards[i].name;
      var wizardCoat = similarItem.querySelector('.wizard-coat');
      wizardCoat.style.fill = wizzards[i].coatColor;
      var wizardEyes = similarItem.querySelector('.wizard-eyes');
      wizardEyes.style.fill = wizzards[i].coatEyes;

      fragment.appendChild(similarItem);
      similarList.appendChild(fragment);
    }

  };

  var wizzards = createWizzards(names, surnames, coatColorArr, eyesColorArr);
  renderWizzards(wizzards);

  setupOpenIcon.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      openUserDialog();
    }
  });

  setupOpenBtn.addEventListener('click', function () {
    openUserDialog();
  });

  window.setup = {
    userDialog: userDialog
  };

})();

'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var setupOpenBtn = document.querySelector('.setup-open');
  var setupCloseBtn = userDialog.querySelector('.setup-close');
  var setupOpenIcon = document.querySelector('.setup-open-icon');
  var inputUserName = document.querySelector('.setup-user-name');
  var setupSubmit = document.querySelector('.setup-submit');
  var setupForm = document.querySelector('.setup-wizard-form');

  var WIZZARDS_NUMBER = 4;
  var similarList = document.querySelector('.setup-similar-list');


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

  var openUserDialog = function () {
    userDialog.classList.remove('hidden');
    document.querySelector('.setup-similar').classList.remove('hidden');
    setupCloseBtn.addEventListener('click', closeUserDialog);
    document.addEventListener('keydown', onPopupEscPress);
    setupCloseBtn.addEventListener('keydown', onPopupCloseEnterPress);
    setupSubmit.addEventListener('keydown', onPopupSubmitEnterPres);
    userDialog.style.top = 80 + 'px';
    userDialog.style.left = 50 + '%';
  };

  var closeUserDialog = function () {
    userDialog.classList.add('hidden');
    setupCloseBtn.removeEventListener('click', closeUserDialog);
    document.removeEventListener('keydown', onPopupEscPress);
    setupCloseBtn.removeEventListener('keydown', onPopupCloseEnterPress);
    setupSubmit.removeEventListener('keydown', onPopupSubmitEnterPres);
  };

  var renderWizzard = function (wizzard) {

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZZARDS_NUMBER; i++) {
      var similarItemTemplate = document.querySelector('#similar-wizard-template')
        .content
        .querySelector('.setup-similar-item');

      var similarItem = similarItemTemplate.cloneNode(true);
      var wizzardName = similarItem.querySelector('.setup-similar-label');
      wizzardName.textContent = wizzard.name;
      var wizardCoat = similarItem.querySelector('.wizard-coat');
      wizardCoat.style.fill = wizzard.colorCoat;
      var wizardEyes = similarItem.querySelector('.wizard-eyes');
      wizardEyes.style.fill = wizzard.colorEyes;

      fragment.appendChild(similarItem);
    }
    similarList.appendChild(fragment);
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


  var onLoadSave = function () {
    userDialog.classList.add('hidden');
  };

  setupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(setupForm), onLoadSave, onError);
  });

  window.setup = {
    userDialog: userDialog,
    setupForm: setupForm,
    renderWizzard: renderWizzard,
  };

})();

'use strict';

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColorArr = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColorArr = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomInt = function (min, max) {
  return Math.round(Math.random() * (max - min) + 1);
};

var generateElement = function (element) {
  var random = getRandomInt(0, element.length - 2);
  return element[random];
};

var renderUserDialog = function () {
  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');
  document.querySelector('.setup-similar').classList.remove('hidden');

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

renderUserDialog();
var wizzards = createWizzards(names, surnames, coatColorArr, eyesColorArr);
renderWizzards(wizzards);

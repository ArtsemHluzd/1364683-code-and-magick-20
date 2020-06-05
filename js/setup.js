'use strict';

var characters = [];
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];

var renderUserDialog = function () {

  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');
  document.querySelector('.setup-similar').classList.remove('hidden');
  var similarList = document.querySelector('.setup-similar-list');
  var similarItemTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  for (var i = 0; i < 4; i++) {
    var similarItem = similarItemTemplate.cloneNode(true);
    similarList.appendChild(similarItem);
  }

};

var generateObj = function (nameArr, surnameArr, coatColorArr, eyesColorArr) {

  for (var i = 0; i < nameArr.length; i++) {

    var name = generateElement(nameArr) + ' ' + generateElement(surnameArr);
    var coatColor = generateElement(coatColorArr);
    var eyesColor = generateElement(eyesColorArr);

    characters[i] = {
      name: name,
      coatColor: coatColor,
      eyesColor: eyesColor
    }
  }
};


renderUserDialog();
generateObj(names, surnames, coatColor, eyesColor);

var setupSimilarLabel = document.querySelector('.setup-similar-label');
setupSimilarLabel.textContent = characters[i].name;
var wizardCoat = document.querySelector('.wizard-coat');
wizardCoat.style.fill = characters[i].coatColor;
var wizardEyes = document.querySelector('.wizard-eyes');
wizardEyes.style.fill = characters[i].coatEyes;


var getRandomInt = function (min, max) {
  return Math.round(Math.random() * (max - min) + 1);
};

var generateElement = function (element) {
  var random = getRandomInt(0, element.length - 2);
  return element[random];
};

'use strict';

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

var getRandomInt = function (min, max) {
  return Math.round(Math.random() * (max - min) + 1);
};

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var generateElement = function (element) {
  var random = getRandomInt(0, element.length - 2);
  return element[random];
}

var fillCharacterObj = function (nameArr, surnameArr, coatColorArr) {
  for (var i = 0; i < nameArr.length; i++) {
  // var random = getRandomInt(0, nameArr.length - 2);
  // var name = nameArr[random];
  var name = generateElement(nameArr) + ' ' + generateElement(surnameArr);
  var coatColor = generateElement(coatColorArr);

  console.log(name + coatColor);
}
};

fillCharacterObj(names, surnames, coatColor);
  //   CSSConditionRule.log
  // }
// }

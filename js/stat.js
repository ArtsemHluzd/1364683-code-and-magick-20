'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_START_X = 100;
var CLOUD_START_Y = 10;
var HISTOGRAM_START_X = 150;
var HISTOGRAM_START_Y = 240;
var MAX_HEIGHT_HISTOGRAM = 150;
var WEIGHT_HISTOGRAM = 40;
var DISTANCE_BETWEEN_HISTOGRAM = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, x, y, text, color) {
  ctx.font = '16px PT Mono';
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

var renderRect = function (ctx, x, y, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y - height, DISTANCE_BETWEEN_HISTOGRAM, height);
};

var getRandomInt = function (min, max) {
  return Math.round(Math.random() * (max - min) + 1);
};

var getRandomBlue = function () {
  var hue = 245;
  var suration = getRandomInt(1, 100);
  var lightness = 50;
  return 'hsl(' + hue + ', ' + suration + '%, ' + lightness + '%)';
};

var findMaxTime = function (arr) {
  var maxTime = Math.max.apply(null, arr);
  return Math.round(maxTime);
};

  var renderBar = function (context, index, name, colorText, colorHistogram, time, height1) {
    var x = HISTOGRAM_START_X + (WEIGHT_HISTOGRAM * index) + (DISTANCE_BETWEEN_HISTOGRAM * index);
    var y = HISTOGRAM_START_Y;
    renderText(context, x, y, index, name, colorText);
    renderTime(context, x, y, index, time, colorText, height1);
    renderRect(context, x, y, index, height, colorHistogram);
  };

  function renderHistogram (ctx, arrName, arrTime) {
    for (var i = 0; i < arrTime.length; i++) {
      var height = (arrTime[i] * MAX_HEIGHT_HISTOGRAM) / findMaxTime(arrTime);
      var name = arrName[i];
      var time = arrTime[i];
      var colorText = 'black';
      var colorBlue = getRandomBlue();

      if (arrName[i] === 'Вы') {
        renderBar(ctx, i, name, colorText, 'rgba(255, 0, 0, 1)', Math.round(time), height);
      } else {
        renderBar(ctx, i, name, colorText, colorBlue, Math.round(time), height);
      }
    }
  }

window.renderStatistics = function (ctx, arrName, arrTime) {

  renderCloud(ctx, CLOUD_START_X + 10, CLOUD_START_Y + 10, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_START_X, CLOUD_START_Y, 'white');

  //
  ctx.fillStyle = 'black';
  ctx.fillText('Ура вы победили!', HISTOGRAM_START_X, CLOUD_START_Y + 30);
  ctx.fillText('Список результатов:', HISTOGRAM_START_X, CLOUD_START_Y + 50);

  // Вывод гистограмм

};

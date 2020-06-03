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

  var renderBar = function (context, index, name, colorText, colorHistogram, time, height) {
    var x = HISTOGRAM_START_X + (WEIGHT_HISTOGRAM * index) + (DISTANCE_BETWEEN_HISTOGRAM * index);
    var y = HISTOGRAM_START_Y;
    renderText(context, x + 10, y, name, colorText);
    renderText(context, x + 50, y, time, colorText, height);
    renderRect(context, x, y, height, colorHistogram);
    console.log(x);
  };

  function renderHistogram (ctx, arrName, arrTime) {
    for (var i = 0; i < arrTime.length; i++) {
      var height = (arrTime[i] * MAX_HEIGHT_HISTOGRAM) / findMaxTime(arrTime);
      var name = arrName[i];
      var time = arrTime[i];
      var colorText = 'black';

      if (name == 'Вы') {
        renderBar(ctx, i, name, colorText, 'rgba(255, 0, 0, 1)', Math.round(time), height);
      } else {
        renderBar(ctx, i, name, colorText, getRandomBlue(), Math.round(time), height);
      }
    }
  };

window.renderStatistics = function (ctx, arrName, arrTime) {

  renderCloud(ctx, CLOUD_START_X + 10, CLOUD_START_Y + 10, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_START_X, CLOUD_START_Y, 'white');

  renderText(ctx, CLOUD_START_X + 50, CLOUD_START_Y + 30, 'Ура вы победили!', 'black');
  renderText(ctx, CLOUD_START_X + 50, CLOUD_START_Y + 50, 'Список результатов:', 'black');

  renderHistogram(ctx, arrName, arrTime);

};

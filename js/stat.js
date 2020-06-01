var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_START_X = 100;
var CLOUD_START_Y = 10;
var HISTOGRAM_START_X = 150;
var HISTOGRAM_START_Y = 240;
var MAX_HEIGHT_HISTOGRAM = 150;
var WEIGHT_HISTOGRAM = 40;
var DISTANCE_BETWEEN_HISTOGRAM = 50;
var randomNumber;
var randomBlue;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

var renderText = function (ctx, index, name, color) {
  ctx.fillStyle = color;
    ctx.fillText(name, HISTOGRAM_START_X + (WEIGHT_HISTOGRAM * index) + (DISTANCE_BETWEEN_HISTOGRAM * index), HISTOGRAM_START_Y + 20);
}

var renderTime = function (ctx, index, time, color, height) {
  ctx.fillStyle = color;
    ctx.fillText(time, HISTOGRAM_START_X + (WEIGHT_HISTOGRAM * index) + (DISTANCE_BETWEEN_HISTOGRAM * index), HISTOGRAM_START_Y - height - 5);
}

var renderHistogram = function (ctx, index, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(HISTOGRAM_START_X + (WEIGHT_HISTOGRAM * index) + (DISTANCE_BETWEEN_HISTOGRAM * index), HISTOGRAM_START_Y - height, DISTANCE_BETWEEN_HISTOGRAM, height);
}

var renderDiagram = function (ctx, index, name, colorText, colorHistogram, time, height) {
  renderText(ctx, index, name, colorText);
  renderTime(ctx, index, time, colorText, height);
  renderHistogram(ctx, index, height, colorHistogram);
}

var getRandomInt = function(min, max) {
  randomNumber = Math.round(Math.random() * (max - min) + 1);
  return randomNumber;
}

var getRandomBlue = function() {
  randomBlue = "hsl(245, " + randomNumber + "%, 50%)";
  return randomBlue;
}

window.renderStatistics = function (ctx, arrName, arrTime) {

  renderCloud(ctx, CLOUD_START_X + 10, CLOUD_START_Y + 10, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_START_X, CLOUD_START_Y, 'white');
  ctx.font = '16px PT Mono';

  ctx.fillStyle = 'black';
  ctx.fillStyle = '16px PT Mono';
  ctx.fillText('Ура вы победили!', HISTOGRAM_START_X, CLOUD_START_Y + 30);
  ctx.fillText('Список результатов:', HISTOGRAM_START_X, CLOUD_START_Y + 50);

  var maxTime = 0;
  var height;

  // Поиск максимального значения из arrTime
  var findMaxTime = function () {
    for (var i = 0; i < arrTime.length; i++) {
      if (maxTime < arrTime[i]) {
        maxTime = Math.round(arrTime[i]);
      }
    }
    return maxTime;
  }
  findMaxTime();

  // Вывод гистограмм
  for (var i = 0; i < arrTime.length; i++) {
    height = (arrTime[i] * MAX_HEIGHT_HISTOGRAM) / maxTime;
    if (arrName[i] == "Вы") {
      renderDiagram(ctx, i, arrName[i], 'black', 'rgba(255, 0, 0, 1)', Math.round(arrTime[i]), height);
    } else {
      // var randomNumber = Math.round(Math.random() * (100 - 1) + 1);
      getRandomInt(1, 100);
      getRandomBlue();
      renderDiagram(ctx, i, arrName[i], 'black', randomBlue, Math.round(arrTime[i]), height);
    }
  }
}

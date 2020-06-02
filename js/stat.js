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
}

var renderText = function (ctx, x, y, index, text, color) {
  ctx.fillStyle = color;
  ctx.fillText(text, x, y + 20);
}

var renderTime = function (ctx, x, y, index, time, color, height) {
  ctx.fillStyle = color;
    ctx.fillText(time, x, y - height - 5);
}

var renderBar = function (ctx, x, y, index, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y - height, DISTANCE_BETWEEN_HISTOGRAM, height);
}

var getRandomInt = function(min, max) {
  return Math.round(Math.random() * (max - min) + 1);
}

var randomBlue;
var getRandomBlue = function() {
  var hue = 245;
  var suration = getRandomInt(1, 100);
  var lightness = 50;
  randomBlue = "hsl(" + hue + ", " + suration + "%, " + lightness + "%)";
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

  var findMaxTime = function (arr) {
    maxTime = Math.max.apply(null, arr);
    return Math.round(maxTime);
  }
  findMaxTime(arrTime);

  var renderHistogram = function (ctx, index, name, colorText, colorHistogram, time, height) {
    var x = HISTOGRAM_START_X + (WEIGHT_HISTOGRAM * index) + (DISTANCE_BETWEEN_HISTOGRAM * index);
    var y = HISTOGRAM_START_Y;
    renderText(ctx, x, y, index, name, colorText);
    renderTime(ctx, x, y, index, time, colorText, height);
    renderBar(ctx, x, y, index, height, colorHistogram);
  }

  // Вывод гистограмм
  for (var i = 0; i < arrTime.length; i++) {
    var height = (arrTime[i] * MAX_HEIGHT_HISTOGRAM) / maxTime;
    var name = arrName[i];
    var time = arrTime[i];
    if (arrName[i] == "Вы") {
      renderHistogram(ctx, i, name, 'black', 'rgba(255, 0, 0, 1)', Math.round(time), height);
    } else {
      getRandomInt(1, 100);
      getRandomBlue();
      renderHistogram(ctx, i, name, 'black', randomBlue, Math.round(time), height);
    }
  }
}

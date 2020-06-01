var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_START_X = 100;
var CLOUD_START_Y = 10;
var HISTOGRAM_START_X = 150;
var HISTOGRAM_START_Y = 240;
var MAX_HEIGHT_HISTOGRAM = 150;
var WEIGHT_HISTOGRAM = 40;
var DISTANCE_BETWEEN_HISTOGRAM = 50;

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}



window.renderStatistics = function(ctx, arrName, arrTime) {

renderCloud(ctx, CLOUD_START_X + 10, CLOUD_START_Y + 10, 'rgba(0, 0, 0, 0.7)');
renderCloud(ctx, CLOUD_START_X , CLOUD_START_Y, 'white');  ctx.font = '16px PT Mono';

ctx.fillStyle = 'black';
ctx.fillStyle = '16px PT Mono';
ctx.fillText('Ура вы победили!', HISTOGRAM_START_X, CLOUD_START_Y + 30);
ctx.fillText('Список результатов:', HISTOGRAM_START_X, CLOUD_START_Y + 50);

var arrRoundTime = [];
var maxTime = 0;
var height;

// Новый массив, чтобы округлить значения
for (var i = 0; i < arrTime.length; i++) {
    arrRoundTime.push(Math.round(arrTime[i]));
}

// Поиск максимального значения из arrTime
var findMaxTime = function() {
  for (var i = 0; i < arrRoundTime.length; i++) {
    if (maxTime < arrRoundTime[i]) {
      maxTime = arrRoundTime[i];
    }
  }
  return maxTime;
}
findMaxTime();

// Функция по выводу гистограммы
var renderHistogram = function(ctx, index, name, height, color) {
  ctx.fillStyle = 'black';
  ctx.fillText(name, HISTOGRAM_START_X + (WEIGHT_HISTOGRAM * index) + (DISTANCE_BETWEEN_HISTOGRAM * index), HISTOGRAM_START_Y + 20);
  ctx.fillStyle = color;
  ctx.fillRect(HISTOGRAM_START_X + (WEIGHT_HISTOGRAM * index)+ (DISTANCE_BETWEEN_HISTOGRAM * index), HISTOGRAM_START_Y - height, DISTANCE_BETWEEN_HISTOGRAM, height);
}

// Вывод гистограмм
for (var i = 0; i < arrTime.length; i++) {
  height = (arrTime[i] * MAX_HEIGHT_HISTOGRAM) / maxTime;
  if (arrName[i] == "Вы") {
    renderHistogram(ctx, i, arrName[i], height, 'rgba(255, 0, 0, 1)');
  } else {
  var randomNumber = Math.round(Math.random() * (100 - 1) + 1);
  var randomBlue = "hsl(245, " + randomNumber + "%, 50%)";
  renderHistogram(ctx, i, arrName[i], height, randomBlue);
  }
}
}



'use strict';

(function () {
  var userDialog = window.setup.userDialog;
  var userDialogUpload = userDialog.querySelector('.upload');

  userDialogUpload.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = true;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function () {
      userDialogUpload.removeEventListener('mousemove', onMouseMove);
      userDialogUpload.removeEventListener('mouseup', onMouseUp);
      
      dragged = false;

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          userDialogUpload.removeEventListener('click', onClickPreventDefault);
        };
        userDialogUpload.addEventListener('click', onClickPreventDefault);
      }
    };

    userDialogUpload.addEventListener('mousemove', onMouseMove);
    userDialogUpload.addEventListener('mouseup', onMouseUp);
  });

})();

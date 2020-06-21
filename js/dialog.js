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

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        Y: startCoords.y - moveEvt.clientY
      };

      userDialogUpload.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialogUpload.style.left = (userDialog.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      document.removeEventListener(onMouseMove);
      document.removeEventListener(onMouseUp);
    };

    userDialogUpload.addEventListener('mousemove', onMouseMove);
    userDialogUpload.addEventListener('mouseup', onMouseUp);
  });

})();

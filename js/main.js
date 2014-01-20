var pass = require('parking_pass'),
    $    = require('jQuery');

$(function () {
  var holder = pass.getData();

  $('#changeHolder').on('submit', function (e) {
    e.preventDefault();
    var data = {
      "new": {
        "name": $('#changeHolderInput').val(),
        "current": 1
      }
    };
    pass.postData(data);
  });
});
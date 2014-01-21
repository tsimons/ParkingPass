$(function () {
  window.pass = new ParkingPass();

  pass.getData();

  $('#changeHolder').on('submit', function (e) {
    e.preventDefault();
    var data = {
      "new": {
        "name": $('#changeHolderInput').val(),
        "current": 1
      },
      "old": {
        "name": $('#currentHolder').text(),
        "current": 0
      }
    };
    pass.postData(data);
  });
});
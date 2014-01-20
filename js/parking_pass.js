var ParkingPass = ParkingPass || function () {
  checkOption = function (name) {
    var list = $('#previousHolders'),
        options = list.find('option'),
        i = 0,
        len = options.length;

    for (i; i<len; i++) {
      if (option[i].val() !== name) {
        return name;
      }
    }

  };
  
  appendOption = function (name) {
    if (!checkOption(name)) {
      $('#previousHolders').append('<option value="' + name + '">');
    }
  };

  return {
    getData: function () {
      $.get('db.php', function(data, status, xhr) {
        var parsed = JSON.parse(data),
            current = 'Nobody';

        for (var key in parsed) { if (parsed.hasOwnProperty(key)) {
          appendOption(parsed[key].name);

          if (parsed[key].current == 1) {
            current = parsed[key];
          }
        }}

        return {
          'data': data,
          'current': current
        };
      });
    },

    attempts: 0,
    
    postData: function (postData) {
      var self = this;

      $.post('dp.php', data, function (returnData, status, xhr) {
        if (returnData.status == "success") {
          appendOption(postData.name);
          self.attempts =  0;
          return true;
        } else {
          self.attempts++;
          if (self.attempts === 3) {
            console.warn('Failed 3 times. Please check your connection');
            return false;
          } else {
            console.warn('Request failed. Trying again...');
            
            setTimeout(function () {
              postData(data);
            }, 1000);
          }
        }
      });
    }
  };
}
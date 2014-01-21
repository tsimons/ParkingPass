var ParkingPass = ParkingPass || function () {
  checkOption = function (name) {
    var list = $('#previousHolders'),
        options = list.find('option'),
        i = 0,
        len = options.length;

    for (i; i<len; i++) {
      if (options[i].value !== name) {
        return name;
      }
    }

  };
  
  appendOption = function (name) {
    $('#previousHolders').append('<option value="' + name + '">');
  };

  updateHolder = function (name) {
    $('#currentHolder').text(name || "nobody");
  };

  return {
    getData: function () {
      $.get('db.php', function(data, status, xhr) {
        var data = data.split('|'),
            len = data.length,
            i=0,
            current = 'nobody';

        for (i; i < len - 1; i++) {
          var parsed = JSON.parse(data[i]);
          console.log(parsed);
          appendOption(parsed.name);

          if (parsed.current == 1) {
            current = parsed.name;
          }

          updateHolder(current);
        }
      });
    },

    attempts: 0,
    
    postData: function (postData) {
      var self = this;

      $.post('dp.php', data, function (returnData, status, xhr) {
        if (returnData.status == "success") {
          if (!checkOption(postData.name)) {
            appendOption(postData.name);
          }
          
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
function hex2a(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2) str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

exports.handler = function(context, event, callback) {
  	if (event.secret !== context.SECRET) return callback(null, {success: false, reason: "request is not authorized"});
  	if (!event.device) return callback(null, {success: false, reason: "device is not specified"});
  	if (!event.data) return callback(null, {success: false, reason: "data is not specified"});
  	if (!event.time) return callback(null, {success: false, reason: "time is not specified"});

	Runtime.getSync()
      .lists("sigfox-twilio-demo.f2")
      .syncListItems.create({
      	data: event
      })
  	  .then(function (response) {
      	callback(null, {success: true, response: response});
      })
      .catch(function (reason) {
      	callback(null, {success: false, reason: reason});
      });
};


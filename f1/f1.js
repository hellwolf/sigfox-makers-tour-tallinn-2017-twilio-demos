// convert hexadecimal formated string to string
function hex2a(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2) { str += String.fromCharCode(parseInt(hex.substr(i, 2), 16)); }
    return str;
}

exports.handler = function(context, event, callback) {
  	if (event.secret !== context.SECRET) { return callback(null, {success: false, reason: "request is not authorized"}); }
  	if (!event.device) { return callback(null, {success: false, reason: "device is not specified"}); }
  	if (!event.data) { return callback(null, {success: false, reason: "data is not specified"}); }
  	if (!event.time) { return callback(null, {success: false, reason: "time is not specified"}); }

    // This returns a instance of the full Twilio REST API client
    //   -> https://www.twilio.com/docs/api/rest
    var client = context.getTwilioClient();
    if (event.data > 30) {
        client.messages.create({
            to: context.TO_PHONE_NUMBER,
            from: context.FROM_PHONE_NUMBER,
            body: event.device + ": " + hex2a(event.data),
        }).then(() => {
        	callback(null, { success: true, result: "alert sent" });
        }).fail((err) => {
        	callback(null, { success: false, result: "alert sending failed: " + err });
        });
    } else {
        callback(null, { success: true, result: "nothing happened" });
    }
};


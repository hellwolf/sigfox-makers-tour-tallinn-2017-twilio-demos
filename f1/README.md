# Sigfox Twilio Demo F1

## What You Will Learn

* How to wire up a [device type](https://backend.sigfox.com/devicetype/) in Sigfox backend to Twilio Functions using a custom callback mechanism.
* Deploy a Function containing code that pushes an SMS to own phone number. Have alert text contextualized, containing the device ID.
* Then using a Sigfox development kit (PyCom) send an uplink “alarm” message to trigger the above flow.

## Steps

- Buy a new Twilio Number with international SMS capability at least: https://www.twilio.com/console/phone-numbers/search
- Deploy a new twilio function:
    - Open https://www.twilio.com/console/runtime/functions/manage
    - Create a new function by clicking '+'
    - Create a blank function
    - Set function name to 'Twilio Sigfox Demo F1"
    - Set function path to '/f1'
    - Copy paste `f1.js` to the code area
    - save
- Configure context variables for the function:
    - `SECRET` : a string that the sigfox device callback invocation will send, in order to authorize the requests
    - `FROM_PHONE_NUMBER` : A twilio phone number that belongs to this account
    - `TO_PHONE_NUMBER` : A mobile number which is to receive the alert messages
- Test locally with `curl` command
    - `curl -s -X POST https://your-runtime-domain.twil.io/f1 -H "content-type: application/json" -d '{"secret":"some_secret", "device": "test", "data": "3239"}'`
- Create a new custom callback for the selected [device type](https://backend.sigfox.com/devicetype/)
    - Set type to `DATA/UPLINK`.
    - Channel: URL
    - Url pattern: https://your-runtime-domain.twil.io/f1
    - HTTP Method: POST
    - Body:
      ```
      {
        "secret": "your_secret",
        "device": "{device}",
        "time": "{time}",
        "data": "{data}"
      }
      ```
- Test with SiPy devkit
    - Connect to the SiPy devkit with screen command or via Visual Studio Code or other means supported by the devkit.
    - Execute `sipy.py` to simulate a temperature reading.

## Further Readings

- [Building apps with Twilio Functions](https://support.twilio.com/hc/en-us/articles/115007737928-Building-apps-with-Twilio-Functions)
- [Runtime Client](https://www.twilio.com/docs/api/runtime/runtime-client)

# Sigfox Twilio Demo F2

**NB!**: This demo assumes you have already setup the `Demo F1`.

## What You Will Learn

* Deploy another Function containing code that pushes device data to a Sync list.
* Demonstrate a live browser dashboard that runs Sync JS SDK, subscribes to a list, and reflects device state update. Use heat pump produced energy meter as an example.
* Then using a Sigfox development kit (PyCom) send an uplink message with specific energy counter value to trigger the above flow.

## Steps

- Buy a new Twilio Number with international SMS capability at least: https://www.twilio.com/console/phone-numbers/search
- Deploy a new twilio function:
    - Open https://www.twilio.com/console/runtime/functions/manage
    - Create a new function by clicking '+'
    - Create a blank function
    - Set function name to "Twilio Sigfox Demo F2"
    - Set function path to "/f2"
    - Copy paste `f2.js` to the code area
- Deploy runtime asset `f2.html`
    - Browse the result at https://your-runtime-domain.twil.io/assets/f2.html
- Test locally with `curl` command
    - `curl -s -X POST https://your-runtime-domain.twil.io/f2 -H "content-type: application/json" -d '{"secret":"some_secret", "device": "test", "data": "3234"}'`
- Change the custom callback for the selected [device type](https://backend.sigfox.com/devicetype/) to https://your-runtime-domain.twil.io/f2
- Test with SiPy devkit
    - Connect to the SiPy devkit with screen command or via Visual Studio Code or other means supported by the devkit.
    - Execute `sipy.py` to simulate a temperature reading.

## Further Readings

- [THE SYNC REST API](https://www.twilio.com/docs/api/sync/rest)

/**
 *  Sync Token Template
 * 
 *  This Template shows you how to mint Access Tokens for Twilio Sync. Please note, this is for prototyping purposes
 *  only. You will want to validate the identity of clients requesting Access Token in most production applications and set
 *  the identity when minting the Token.
 * 
 *  Pre-requisites
 *  - Create a Sync Service (https://www.twilio.com/docs/api/sync/rest/services)
*   - Create an API Key (https://www.twilio.com/console/runtime/api-keys)
 */

const ClientCapability = Twilio.jwt.ClientCapability;

function getTwimlAppToken(context) {
  const capability = new ClientCapability({
    accountSid: context.ACCOUNT_SID,
    authToken: context.AUTH_TOKEN,
    ttl : parseInt(context.TOKEN_TTL)
  });

  capability.addScope(
    new ClientCapability.OutgoingClientScope({
      applicationSid: context.TWIML_APP_SID})
  );

	return capability.toJwt();
}

exports.handler = function(context, event, callback) {  
  // make sure you enable ACCOUNT_SID and AUTH_TOKEN in Functions/Configuration
  const ACCOUNT_SID = context.ACCOUNT_SID;

  const SERVICE_SID = context.SYNC_SERVICE_SID;
  const API_KEY = context.TWILIO_API_KEY;
  const API_SECRET = context.TWILIO_API_SECRET;

  // REMINDER: This identity is only for prototyping purposes
  const IDENTITY = 'only for testing';

  const AccessToken = Twilio.jwt.AccessToken;
  const SyncGrant = AccessToken.SyncGrant;

  const syncGrant = new SyncGrant({
    serviceSid: SERVICE_SID
  });

  const accessToken = new AccessToken(
    ACCOUNT_SID,
    API_KEY,
    API_SECRET
  );

  accessToken.addGrant(syncGrant);
  accessToken.identity = IDENTITY;

  callback(null, {
    sync_token: accessToken.toJwt(),
    twiml_token: getTwimlAppToken(context)
  });
}

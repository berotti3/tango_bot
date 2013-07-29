function botTweet(){
  forTwit = createTwitText();
  tweetInitialize();
  twitterPost(forTwit);
}

function tweetInitialize() {
  // Setup OAuthServiceConfig
  var oAuthConfig = UrlFetchApp.addOAuthService("twitter");
  oAuthConfig.setAccessTokenUrl("http://api.twitter.com/oauth/access_token");
  oAuthConfig.setRequestTokenUrl("http://api.twitter.com/oauth/request_token");
  oAuthConfig.setAuthorizationUrl("http://api.twitter.com/oauth/authorize");
  oAuthConfig.setConsumerKey("ConsumerKey");
  oAuthConfig.setConsumerSecret("ConsumerSecret");
}

function twitterPost(text) {
  var options =
  {
    "oAuthServiceName" : "twitter",
    "oAuthUseToken" : "always",
    "method" : "POST"
  };
  var encodedTweet = encodeURIComponent(text);
  var result = UrlFetchApp.fetch("http://api.twitter.com/1.1/statuses/update.json?status=" + encodedTweet, options);
  var o  = Utilities.jsonParse(result.getContentText());
  Logger.log(o);
  Logger.log(result.getResponseCode());
  
  return true;
}

function createTwitText() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('word1');
  var rand = Math.floor(Math.random()*(sheet.getLastRow()-1)) + 2;
  
  return sheet.getRange(rand, 1).getValue();
}
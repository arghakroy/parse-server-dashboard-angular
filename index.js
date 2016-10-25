// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var path = require('path');

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;
var port = process.env.PORT || 8080;
var SERVER_URL = 'http://localhost:'+port+'/parse';

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/parsedb',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'appid123',
  masterKey: process.env.MASTER_KEY || 'masterkey123', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || SERVER_URL,  // Don't forget to change to https if needed
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve static assets from the /public folder
app.use('/', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  //res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

var config={
  "allowInsecureHTTP": true,
  "apps": [{
      "serverURL": SERVER_URL,
      "appId": "appid123",
      "masterKey": "masterkey123",
      "appName": "MyApp"
  }],
  "users": [
    {
      "user":"admin",
      "pass":"admin"
    }
  ],
};
var dashboard = new ParseDashboard(config,config.allowInsecureHTTP);

app.use('/dashboard', dashboard);

var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);

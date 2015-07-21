var express = require('express'),
    path = require('path'),
    // orderHelper = require('./lib/orderHelper'),
    _ = require("underscore"),
    bodyParser = require('body-parser'),
    url = require('url'),
    request = require('request'),
    deleteKey = require('key-del'),
    app = express();

// Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// Functions


var serverEndpoint = 'http://host:port/metricsPath';
// Routes
app.get('/metrics', function(req, res) {
    request(serverEndpoint, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(response.body);
        } else {
            console.log('Error: ' + error);
        }
    });
});

var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port);

console.log("Application started on port " + port);

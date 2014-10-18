//'use strict';
//
//var http = require('http');
//var path = require('path');
//var express = require('express');
//var routes = require('./routes');
//
//var app = express();
//// Set default node environment to development
//process.env.NODE_ENV = process.env.NODE_ENV || 'development';
//
//app.configure(function () {
//    app.set('port', process.env.PORT || config.port || 8997);
//    app.set('view engine', 'jade');
//    require('./lib/view')(app);  // view engine and options
//    app.use(express.urlencoded());
//    app.use(express.bodyParser());
//    app.use(express.json());
//});
//
//app.configure('development', function () {
//    app.use(require('connect-livereload')());
//
//    // Disable caching of scripts for easier testing
//    app.use('/scripts/', function noCache(req, res, next) {
//        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
//        res.header('Pragma', 'no-cache');
//        res.header('Expires', 0);
//        next();
//    });
//
//    app.use(express.favicon(path.join(__dirname, 'public', 'favicon.ico')));
//    app.use(express.static(path.join(__dirname, '.tmp')));
//    app.use(express.static(path.join(__dirname, 'public')));
//    app.set('views', __dirname + '/views');
//
//    app.use(express.logger('dev'));
//    app.use(app.router);
//});
//
//// Routing
//require('./routes')(app);
//
//// Start server
//http.createServer(app)
//    .on('error', function (err) {
//        console.log(err);
//        process.exit(1);
//    })
//    .listen(app.get('port'), function () {
//        console.log('market-frontend listening on port %d in %s mode', app.get('port'), app.get('env'));
//    });
//

var fs = require("fs");
var host = "127.0.0.1";
var port = 1337;
var express = require("express");
var routes = require('./routes');
var app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(app.router); //use both root and other routes below
app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder

require('./routes')(app);

app.listen(port, host);

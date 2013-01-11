/**
 * Module dependencies.
 */

var express = require('express');

var app = express();

var config	= require('./config/config.js')(),
	server	= require('./config/environment.js')(app, express, config),
	routes	= require('./routes/index')(app, config);

app.configure('development', function(){
	app.use(express.errorHandler());
});

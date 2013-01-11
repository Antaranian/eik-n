var http = require('http');

module.exports = function(app, express, config){
	// console.log(app);

	app.configure(function(){
		app.use(express.methodOverride());
		app.use(express.cookieParser());
		app.use(express.bodyParser());
		app.use(app.router);

		app.set('hostname', config.host.name);
		app.set('port', config.host.port);
	});

	return http.createServer(app)
		.listen(app.get('port'), function(){
			console.log("Express server listening on port " + app.get('port'));
		})	
};

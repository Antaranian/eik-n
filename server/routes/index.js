var font = require('../models/font.js');

module.exports = function(app, config){
	app.get('/api/test', function(req, res){
		res.json(200, 'asdfasf');
	});

	app.post('/api/font/upload/*', function(req, res){
		font.importare(req, function(err, details){
			if (err) {
				res.json({ error: err });
				return false;
			}
			res.json(details);
		});
	});

	app.post('/api/font/generate', function(req, res){
		font.generate(req, function(err, details){
			if (err) {
				res.json({ error: err });
				return false;
			}
			res.json(details);
		});
	});
};
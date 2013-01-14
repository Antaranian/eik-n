var font = require('../models/font.js'),
	glyphs = require('../models/glyphs.js')();

module.exports = function(app, config){
	app.get('/api/test', function(req, res){
		res.json(200, 'asdfasf');
	});

	app.post('/api/fonts/upload/*', function(req, res){
		font.upload(req, function(err, details){
			if (err) {
				res.json({ error: err });
				return false;
			}
			res.json(details);
		});
	});

	app.post('/api/glyphs/upload/*', function(req, res){
		glyphs.upload(req, function(err, details){
			if (err) {
				res.json({ error: err });
				return false;
			}
			res.json(details);
		});
	});

	app.post('/api/fonts/generate', function(req, res){
		font.generate(req, function(err, details){
			if (err) {
				res.json({ error: err });
				return false;
			}
			res.json(details);
		});
	});
};
var	fs		= require('fs-extra'),
	exec	= require('child_process').exec;

var _ = require('underscore');

var config	= require('../config/config.js')();

var util = {
		// make a filename-safe string
		filename: function(name, ext){
			name = name || Date.now() + ''; 
			ext = ext ? '.' + ext : '';
			return name
				.replace(/[^a-z0-9]/gi, '-')
				.toLowerCase() + ext;
		},
		// return base64 encoded content of file as string
		b64: function(path){
			var data = fs.readFileSync(path);
			return new Buffer(data).toString('base64');
		}
	};

module.exports = function(name){
	var self = {
			glyphs	: [],
			name	: name,
			path	: config.dirs.tmp + util.filename() + '.ttf'
		};

	self.importGlyphs = function(data){
		Array.prototype.push.apply(self.glyphs, data);
		return self;
	};

	self.renderFont = function(done){
		var g = _.map(self.glyphs, function(glyph, i){
					var code = (0xe000 + i).toString(16);
					return [glyph.name, code, config.dirs.static + glyph.fontid + '/glyphs/' + glyph.file].join(',');
				}).join(',,'),
			command = ['cd', config.dirs.script, '&& ./importglyphs.py',
				'-p', self.path, 
				'-n', self.name, 
				'-g', g
			].join(' ');
		exec(command, function(err, out){
			done && done(err, self.path);
		});
	};

	return self;
};
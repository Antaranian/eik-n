var	fs		= require('fs-extra'),
	exec	= require('child_process').exec;

var _ = require('underscore');

var config	= require('../config/config.js')();

var tpl = fs.readFileSync(config.dirs.tpl + 'preview.html', 'utf8');

var a = function(font){

	var self = _.pick(font, 'details', 'options', 'id', 'filename');

	self.tpl = _.template(tpl);

	self.markup = '';

	self.render = function(glyphs){
		self.markup = self.tpl({
			font	: self.details,
			glyphs	: glyphs,
			prefix	: self.options.prefix,
			name	: self.filename
		});

		return self;
	};

	self.save = function(done){
		var path = config.dirs.static + self.id + '/fonts/index.html';

		fs.writeFile(path, self.markup);

		done && done();
	};

	return self;
};

module.exports = a;

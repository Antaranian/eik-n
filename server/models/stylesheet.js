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

module.exports = function(font){
	var self = _.pick(font, 'details', 'dirs', 'id', 'filename');

	var options = {
			filetypes: 'ttf,svg,woff',
			base64: false
		};

	var details = self.details;

	var headlines = [
			'@font-face {',
			'	font-family: "' + details.family + '";',
			'	font-style: ' + details.style + ';',
			'	font-weight: ' + details.weight + ';'
		].join('\n'),
		typelines = '', footlines = ['}\n\n'],
		glyphlines = '\n\n';

	var renderType = {
			woff: function(uri, path, base64){
				var txt = '"' + uri + '.woff"';
				if (base64) {
					txt = 'data:font/woff;charset=utf-8;base64,' + util.b64(path);
				}
				return '		url(' + txt + ') format("woff"),';
			},
			ttf: function(uri, path, base64){
				var txt = '"' + uri + '.ttf"';
				if (base64) {
					var path = self.dirs.fonts + self.filename + '.ttf';
					txt = 'data:font/truetype;charset=utf-8;base64,' + util.b64(path);
				}
				return '		url(' + txt + ') format("truetype"),';
			},
			svg: function(uri){
				return '		url("' + uri + '.svg#' + self.details.fontid + '") format("svg")';
			},
			otf: function(uri){
				return '		url("' + uri + '.otf") format("opentype")';
			}
		};

	self.generate = function(o){
		// console.log(o, options);
		var o = _.extend(options, o);


		var uri = config.host.static + self.id + '/fonts/' + self.filename,
		// var uri = '/static/' + self.id + '/fonts/' + self.filename,
			path = config.dirs.static + self.id + '/fonts/' + self.filename;

		var types = o.filetypes.split(',');

		var lines = [];
		// IE hack
		if (_.contains(types, 'eot')) {
			Array.prototype.push(lines, [
					'	src: url("' + uri + '.eot");',
					'	src: local("' + self.details.family + '"),',
					'		url("' + uri + '.eot?#iefix") format("embedded-opentype"),'
				]);
		} else {
			lines.push('	src: local("' + self.details.family + '"),');
		}

		_.each(types, function(type){
			var line = renderType[type](uri, path, o.base64);
			lines.push(line);
		});

		var lastline = lines.pop();
		lastline = lastline.slice(0, -1) + ';';
		lines.push(lastline);

		typelines = lines.join('\n');


		return self;
	};

	self.appendGlyphs = function(glyphs, prefix){
		prefix = prefix || 'icon-';

		glyphlines += ['[class^="' + prefix + '"]:before, [class*=" ' + prefix + '"]:before {',
			'	font-family: "' + self.details.family + '";',
			'	font-style: normal;',
			'	speak: none;',
			'	font-weight: normal;',
			'	line-height: 1;',
			'	-webkit-font-smoothing: antialiased;',
			'}'].join('\n') + 
			'\n\n' +
			_.map(glyphs, function(glyph){
				return '.' + prefix + glyph.name + ':before {' +
					'	content: "\\' + glyph.code + '";' +
					'}';
			}).join('\n');

		return self;
	};

	self.save = function(done){
		var path = config.dirs.static + self.id + '/fonts/' + self.filename + '.css',
			lines = [headlines, typelines, footlines, glyphlines].join('\n');

		fs.writeFile(path, lines);
		done && done();
	};

	return self;
};

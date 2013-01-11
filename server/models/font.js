var	fs		= require('fs-extra'),
	exec	= require('child_process').exec;

var step		= require('./step');

// var css		= require('./css'),
// 	glyph	= require('./glyph');

var _			= require('underscore'),
	libxmljs	= require('libxmljs');

var config	= require('../config/config.js')(),
	blacklist = require('../config/fonts.js')('blacklist');

var upload = function(req, dest, done){
		var ws = fs.createWriteStream(dest);

		req.on('data', function(data){
			ws.write(data);
		});
		req.on('end', done);
	},
	info = function(fontPath, done){
		var attrs = ['family', 'name', 'fontid', 'fullname', 'weight', 'angle'],
			command = ['cd', config.dirs.script, '&& ./fontinfo.py ', fontPath].join(' ');

		exec(command, function(err, out){
			var line = out.replace('\n', ''),
				details = _.object(attrs, line.split('|'));

			details.angle = parseFloat(details.angle);
			details.style = details.angle ? 'italic' : 'normal';

			done(err, details);
		});
	},
	convert = function(font, options, done){
		var command = ['cd', config.dirs.script, '&& ./convertfonts.py -t', options.filetypes, '-p', font.fontDir, font.fontPath].join(' ');
		exec(command, done)
	},
	extract = function (fontPath, glyphDir, done) {
		// console.log(fontPath, glyphDir);
		var attrs = ['file', 'name', 'code'],
			command = ['cd', config.dirs.script, '&& ./exportglyphs.py -p', glyphDir, fontPath].join(' ');
		exec(command, function (err, out){
			var glyphs = _.chain(out.split('\n'))
					.compact()
					.map(function(line){
						var glyph = _.object(attrs, line.split('|'));
						// glyph.svg = fs.readFileSync(glyphDir + glyph.file, 'utf8');
						return glyph;
					})
					.value();
			done(err, glyphs);
		});
	},
	cssGlyphs = function(glyphs, prefix){
		return _.map(glyphs, function(glyph){
				return '.icon-' + prefix + '-' + glyph.name + ':before { \n' +
					'	content: "\\' + glyph.code + '"; \n' +
					'}';
			}).join('\n');
	};

var importare = step.fn(
		function init(err, req){
			this.options = {
				filetypes: 'fft,svg,woff'
			};

			this.font = {
				dir: Date.now()
			};

			this.dir = config.dirs.static + this.font.dir + '/';

			this.fontDir = this.dir + 'font/';
			this.glyphDir = this.dir + 'glyph/';

			this.fontPath = this.fontDir + req.query.qqfile;

			fs.mkdirsSync(this.fontDir);
			fs.mkdirsSync(this.glyphDir);

			return req;
		},
		function uploadDo(err, req){
			upload(req, this.fontPath, this);
		},
		function infoDo(err) {
			var self = this;
			info(this.fontPath, function(err, details){
				_.extend(self.font, details);
				self();
			});
		},
		function convertDo(err){
			convert(this, this.options, this)
		},
		function css(err){
			var filename = this.fontPath.split('.').shift().split('/').pop(),
				uri = ([config.host.static, this.font.dir, 'font', filename]).join('/');
			var font = this.font;
				src = this.fontDir + filename,
				stylesheet = ([
					'@font-face {',
					'	font-family: "' + font.family + '";',
					'	src: url("' + uri + '.eot");',
					'	font-style: ' + this.font.style + ';',
					'	font-weight: ' + this.font.weight + ';',
					'	src: url("' + uri + '.eot?#iefix") format("embedded-opentype"),',
					'		url("' + uri + '.woff") format("woff"),',
					'		url("' + uri + '.ttf") format("truetype"),',
					'		url("' + uri + '.svg#' + this.font.fontid + '") format("svg");',
					'}'
				]).join('\n');
			this.filename = filename;
			this.cssPath = src + '.css';
			fs.writeFile(this.cssPath, stylesheet, this);
		},
		function extractDo(err){
			extract(this.fontPath, this.glyphDir, this);
		},
		function cssGlyphsDo(err, glyphs){
			this.glyphs = glyphs;
			var stylesheet = '\n\n' + [
					'[class^="icon-' + this.font.dir + '-"]:before, [class*=" icon-' + this.font.dir + '-"]:before {',
					'	font-family: "' + this.font.family + '";',
					'	font-style: normal;',
					'	speak: none;',
					'	font-weight: normal;',
					'	line-height: 1;',
					'	-webkit-font-smoothing: antialiased;',
					'}'
				].join('\n') + '\n\n';
			stylesheet += cssGlyphs(glyphs, this.font.dir);
			fs.appendFile(this.cssPath, stylesheet, this);
		},
		function response(err){
			return {
				filename: this.filename,
				dir		: this.font.dir,
				name	: this.font.name,
				family	: this.font.family,
				glyphs	: this.glyphs
			}
		}
	);


exports.importare = function(req, done){
	var done = typeof done === 'function' ? 
			done : function(){ };
	importare(null, req, done);
};

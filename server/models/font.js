var	fs		= require('fs-extra'),
	exec	= require('child_process').exec,
	path	= require('path');

var _ = require('underscore');

var Glyphs = require('./glyphs.js'),
	Stylesheet = require('./stylesheet.js'),
	Markup = require('./markup.js');

var config	= require('../config/config.js')();

var dirs = config.dirs;

var upload = function(req, done){
		var filename = util.filename() + req.query.qqfile,
			filepath = config.dirs.tmp + filename;

		var ws = fs.createWriteStream(filepath);

		req.on('data', function(data){
			ws.write(data);
		});
		req.on('end', function(err, a){
			done(err, filepath);
		});
	};

var compress = function(id, done){
		var command = [
				'cd', config.dirs.static + id, 
				'&& zip -r -9', 
				id + '.zip',
				'./fonts/'
			].join(' ');
		exec(command, done)
	};

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

var Font = function(options){
		var self = {
				id: Date.now(),
				details: { }
			};
		self.options = {
			filetypes: 'ttf,svg,woff',
			base64: false,
			prefix: 'icon-' + self.id + '-'
		};

		_.extend(self.options, options);

		self.initialize = function(path, done){
			// create "namespace" for current font
			self.path = path;
			// create required directories
			self.initfs(done);

			return self;
		};

		self.importFont = function(done){
			// get font details
			self.fetchDetails(function(err, details){
				self.details = details;
				self.filename = util.filename(details.fontid); 

				self.makeWeb(done);
			});
		};

		self.makeWeb = function(done){
			// convert fonts to specified formats
			self.convert(function(){
				// create css object instance for this font
				self.css = new Stylesheet(self);
				var css = self.css
						.generate(self.options)
						.save(done);
			});
		};

		self.extract = function(done){
			self.html = new Markup(self); 
			self.extractGlyphs(function(err, glyphs){
				self.glyphs = glyphs;
				self.css
					.appendGlyphs(glyphs, 'icon-' + self.id + '-')
					.save();
				self.html
					.render(glyphs)
				self.html.save();
				done(null, self)
			});
		};

		self.extractGlyphs = function(done){
			var attrs = ['file', 'name', 'code'],
				command = ['cd', config.dirs.script, '&& ./exportglyphs.py -p', self.dirs.glyphs, self.path].join(' ');
			exec(command, function (err, out){
				var lines = _.compact(out.split('\n')),
					glyphs = _.map(lines, function(line){
							return _.object(attrs, line.split('|'));
						});
				done(err, glyphs);
			});
		};

		self.fetchDetails = function(done){
			var attrs = ['family', 'name', 'fontid', 'weight', 'angle'],
				command = ['cd', config.dirs.script, '&& ./fontinfo.py ', self.path].join(' ');

			exec(command, function(err, out){
				var line = out.replace('\n', ''),
					details = _.object(attrs, line.split('|'));

				details.angle = parseFloat(details.angle);
				details.style = details.angle ? 'italic' : 'normal';

				done(err, details);
			});
		};

		self.convert = function(done){
			var command = ['cd', config.dirs.script, '&& ./convertfonts.py',
					'-t', self.options.filetypes, 
					'-n', self.filename,
					'-p', self.dirs.fonts, 
					self.path].join(' ');
			exec(command, done)
		};

		self.toJSON = function(){
			return _.pick(self, 'id', 'details', 'filename', 'glyphs');
		};

		// create required directory structure
		self.initfs = function(done){
			var base = config.dirs.static + self.id,
				dirs = {
					fonts	: base + '/fonts/',
					glyphs	: base + '/glyphs/'
				};

			fs.mkdirsSync(dirs.fonts);
			fs.mkdirsSync(dirs.glyphs);

			self.dirs = dirs;

			done && done();
		};

		return self;
	};


exports.upload = function(req, done){
	upload(req, function(err, path){
		var font = new Font();
		font.initialize(path);
		font.importFont(function(){
			font.extract(function(){
				done(null, font.toJSON());
			});
		});
	});
};

exports.generate = function(req, done){
	var glyphs = req.body.glyphs,
		name = req.body.name,
		prefix = req.body.prefix;
	var g = new Glyphs(name);
	g.importGlyphs(glyphs)
		.renderFont(function(err, path){
			var font = new Font({
					prefix: prefix
				});
			font.initialize(path)
				.importFont(function(){
					font.extract(function(){
						compress(font.id, function(){
							var href = config.host.static + font.id + '/' + font.id + '.zip';
							done(null, href);
						});
					});
				});
		});

}

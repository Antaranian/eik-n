var	fs		= require('fs-extra'),
	exec	= require('child_process').exec;

var step		= require('./step');

var _			= require('underscore');

var config	= require('../config/config.js')();

var header = function(details){
		return ['@font-face {',
			'	font-family: "' + details.family + '";',
			'	font-style: ' + details.style + ';',
			'	font-weight: ' + details.weight + ';'
		].join('\n');
	};

					var filename = config.dirs.static + font.dirname + '/' + font.filename,
						woff = !base64 ? '"' + filename + '.woff"' : 'data:font/woff;charset=utf-8;base64,' + b64(filename + '.woff'),
						ttf = !base64 ? '"' + filename + '.ttf"' : 'data:font/truetype;charset=utf-8;base64,' + b64(filename + '.ttf');

					var	all = {
							woff: '		url(' + woff + ') format("woff")',
							 ttf: '		url(' + ttf + ') format("truetype")',
							 svg: '		url("' + font.filename + '.svg#' + font.fontid + '") format("svg")',
							 eot: '		ur'};

var lines = function(font, options){
		var result = [],
			baseUrl = config.host.static + font.dir + '/';
		if (/svg/.test(options.fonttypes)){
			result.push(
					'		url("' + options.filename + '.svg#' + font.fontid + '") format("svg")'
				);
		}
	};

var webfont = function(font, options){
		var o = _.defaults(iceCream, {
				fonttype	: 'svg,woff,ttf', 
				base64		: false,
				details		: { style: 'normal', weight: 'normal' }
			});

	};

exports.webfont = function(font, options){
	return webfont(font, options);
};

exports.download = function(req, done){
	var done = typeof done === 'function' ? 
			done : function(){ };
	download(null, req, done);
};
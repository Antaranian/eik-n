var baseHost = 'eitest.antaranian.com';

module.exports = function(){
	return {
		host: {
			baseUrl	: 'http://' + baseHost + '/',
			static	: 'http://static.' + baseHost + '/',
			name	: baseHost,
			port	: 8080
		},
		dirs: {
			static	: __dirname + '/../../static/',
			script	: __dirname + '/../scripts/',
			tpl		: __dirname + '/../templates/',
			tmp		: __dirname + '/../../static/tmp/'
		},
		error: {
			default	: 'Something was wrong.' 
		}
	};
};
module.exports = function(){
	return {
		host: {
			baseUrl	: 'http://eicon.antaranian.com/',
			static	: 'http://static.eicon.antaranian.com/',
			name	: 'eicon.antaranian.com',
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
module.exports = function(){
	return {
		host: {
			baseUrl	: 'http://eicon.antaranian.com/',
			static	: 'http://static.eicon.antaranian.com/',
			name	: 'eicon.antaranian.com',
			port	: 8080
		},
		dirs: {
			static	: '/home/antaranian/Current/eicon/static/',
			script	: __dirname + '/../scripts/',
			tmp		: '/home/antaranian/Current/eicon/tmp/'
		},
		error: {
			default	: 'Something was wrong.' 
		}
	};
};
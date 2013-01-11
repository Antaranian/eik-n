var riak = require('riak-js');

module.exports = function(config){
	return riak.getClient({ 
			host: config.riak.host, port: config.riak.port
		});
};

var blacklist = ['dejavu', 'ubuntu'];

var o = {
		blacklist: RegExp( '(' + blacklist.join('|') + ')', 'i')
	};

module.exports = function(key){
	return key ? o[key] : o;
};
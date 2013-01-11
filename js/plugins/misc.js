$.fn.serializeObject = function(){
	var o = {},
		a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

$.download = function(url) {
	var hiddenIFrameID = 'downloader',
		iframe = document.getElementById(hiddenIFrameID);
	if (iframe === null) {
		iframe = document.createElement('iframe');
		iframe.id = hiddenIFrameID;
		iframe.style.display = 'none';
		document.body.appendChild(iframe);
	}
	iframe.src = url;
};

String.prototype.firstUpper = function(){
	return this.toLowerCase().replace(/\b[a-z]/g, function(letter) {
		return letter.toUpperCase();
	});
};
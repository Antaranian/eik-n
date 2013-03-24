/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'dm\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-resize-full' : '&#xf065;',
			'icon-resize-small' : '&#xf066;',
			'icon-plus' : '&#xf067;',
			'icon-minus' : '&#xf068;',
			'icon-download-alt' : '&#xf019;',
			'icon-refresh' : '&#xe000;',
			'icon-cog' : '&#xf013;',
			'icon-designmodo' : '&#xe006;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; i < els.length; i += 1) {
		el = els[i];
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};
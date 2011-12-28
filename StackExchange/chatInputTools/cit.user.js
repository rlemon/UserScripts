// ==UserScript==
// @name          CIT
// @author        rlemon
// @version       0.1
// @namespace     rlemon.com
// @description	  Collection of fixes and tools for the StackExchange Chat Input.
// @include       http://chat.stackexchange.com/rooms/*
// @include       http://chat.stackoverflow.com/rooms/*
// ==/UserScript==

function EmbedCodeOnPage(jcode) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.textContent = jcode;
	document.head.appendChild(script);
}
function EmbedFunctionOnPageAndExecute(function_contents) {
	EmbedCodeOnPage('(' + function_contents.toString() + ')()');
}

EmbedFunctionOnPageAndExecute(function() {
	var createCookie = function(name, value, days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			var expires = '; expires=' + date.toGMTString();
		}
		else var expires = '';
		document.cookie = name + '=' + value + expires + '; path=/';
	};
	var readCookie = function(name) {
		var nameEQ = name + '=';
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	};
	var eraseCookie = function(name) {
		createCookie(name, '', -1);
	};
	var input_area = $('#input-area');
	input_area.css('resize', 'vertical');
});

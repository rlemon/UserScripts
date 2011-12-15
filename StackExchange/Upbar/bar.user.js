// ==UserScript==
// @name          UserUp
// @author        rlemon
// @version       2.0
// @namespace     rlemon.com
// @description	  Moves the userlist to the top allowing for MOAR STARS
// @include       http://chat.stackexchange.com/rooms/*
// @include       http://chat.stackoverflow.com/rooms/*
// ==/UserScript==
// Original concept by AmithKK | https://github.com/Amithkk

function EmbedCodeOnPage(jcode) {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.textContent = jcode;
	document.head.appendChild(script);
}
function EmbedFunctionOnPageAndExecute(function_contents) {
	EmbedCodeOnPage('(function() {' + function_contents.toString() + '})();');
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
	var topbar = $(document.createElement('div')),
		sticky = $(document.createElement('a')),
		menu = $(document.getElementById('sidebar-menu')),
		chat_body = $(document.getElementById('chat-body')),
		top, hidden = false,
		stuck = false,
		cname = 'sechat_topbar_sticky';
	var checkTop = function() {
		if ($(window).scrollTop() === 0) {
			topbar.stop(true, true).animate({
				left: -(topbar.width() - 6)
			}, 300);
			hidden = true;
			return true;
		}
		return false;
	};
	var checkHidden = function() {
		if (hidden) {
			topbar.stop().animate({
				left: 0
			}, 300);
			hidden = false;
		}
	};
	var setPositionTop = function() {
		_top = -(topbar.outerHeight() - 25);
		topbar.css('top', (stuck ? 0 : _top));
	};
	stuck = readCookie(cname);
	sticky.text((stuck ? 'unstick' : 'stick'));
	sticky.css({
		'float': 'right',
		'margin': '2px 1px 0 0',
		'cursor': 'pointer'
	});
	sticky.bind('click', function() {
		stuck = !stuck;
		if (stuck) {
			$(this).text('unstick');
			createCookie(cname, true, 14);
		} else {
			$(this).text('stick');
			eraseCookie(cname);
		}
	});
	menu.append(sticky);
	topbar.css({
		'position': 'fixed',
		'left': '0px',
		'z-index': '1',
		'width': '49%',
		'background-color': '#fff',
		'border-bottom': '2px solid #777',
		'box-shadow': '0px 5px 10px #777',
		'padding': '5px'
	});
	topbar.append($(document.getElementById('present-users')).detach());
	topbar.append(menu.detach());
	chat_body.append(topbar);
	this.onresize = function() {
		setPositionTop();
	};
	this.onresize();
	topbar.hover(function() {
		if (!stuck) {
			$(this).stop(true, true).animate({
				top: 0
			}, 300, function() {
				checkHidden();
			});
		}
	}, function() {
		if (!stuck) {
			$(this).stop(false, false).animate({
				top: _top
			}, 300);
			checkTop();
		}
	});
	$(this).scroll(function() {
		if (!checkTop()) {
			checkHidden();
		}
	});
});

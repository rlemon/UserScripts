// ==UserScript==
// @name          UserUp
// @author        Amith kk | rlemon
// @version       1.3
// @namespace     amith.dasroot.net
// @description	  Moves the userlist to the top
// @include       http://chat.stackexchange.com/rooms/*
// @include       http://chat.stackoverflow.com/rooms/*
// ==/UserScript==
// edits by rlemon
// added auto hide slide down and slide left effects.
// refactored code, reduced DOM calls and improved readability
// removed the useless line that asked "is this the room you are looking for?" 
// improved performance by using native DOM api within jQuery.
// added sticky button to keep user list open
// added cookie support for sticky button
// ????
// profit

// This function embeds code on the actual page. 
function EmbedCodeOnPage(javascript_code) 
{ 
var code_element = document.createElement('script'); 
code_element.type = 'text/javascript'; 
code_element.textContent = javascript_code; 
document.getElementsByTagName('head')[0].appendChild(code_element); 
} 

// This function allows us to embed a function on the 
// page that will immediately get executed. 
function EmbedFunctionOnPageAndExecute(function_contents) 
{ 
EmbedCodeOnPage("(" + function_contents.toString() + ")()"); 
}

EmbedFunctionOnPageAndExecute(function() {
	/* Cookie functions */
	var createCookie = function(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	};

	var readCookie = function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	};

	var eraseCookie = function(name) {
		createCookie(name,"",-1);
	};
	
	/* top bar */
	var topbar = $(document.createElement('div')), sticky = $(document.createElement('a')), menu = $(document.getElementById('sidebar-menu')), chat_body = $(document.getElementById('chat-body')), top, hidden = false, stuck = false, cname = 'sechat_topbar_sticky';
	/* top bar functions */
	var checkTop = function() {
		if( $(window).scrollTop() === 0 ) {
			topbar.stop(true, true).animate({left: -(topbar.width() - 6)},300);
			hidden = true;
			return true;
		}
		return false;
	};
	var checkHidden = function() {
		if( hidden ) {
			topbar.stop().animate({left: 0},300);
			hidden = false;
		}
	};
	
	var setHeight = function() {
		_top = -(topbar.height() - 15);
		topbar.css('top', (stuck ? 0 : _top));
	};
	/* run this shiz */
	stuck = readCookie(cname);
	sticky.text( (stuck ? 'unstick' : 'stick') );
	sticky.css({
		'float': 'right',
		'cursor': 'pointer'
	});
	sticky.bind('click', function() {
		stuck = !stuck;
		if( stuck ) {
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
    topbar.append( $(document.getElementById('present-users')).detach() );
    topbar.append( menu.detach() );
    chat_body.append(topbar);
	setHeight();
	this.onresize = function() {
		if( !stuck ) {
			setHeight();
		}
	};
	this.onresize();
	
	topbar.hover(function() {
		if( !stuck ) {
			$(this).stop(true, true).animate({top:0}, 300, function() {
				checkHidden();
			});
		}

	}, function() {
		if( !stuck ) {
			$(this).stop(false, false).animate({top:_top}, 300);
			checkTop();
		}
	});
	
	$(this).scroll(function() {
		if( !checkTop() ) {
			checkHidden();
		}
	});
});

// ==UserScript==
// @name          UserUp
// @author        Amith kk
// @version       1.0
// @namespace amith.dasroot.net
// @description	  Moves the userlist to the top
// @include       http://chat.stackexchange.com/rooms/*
// @include       http://chat.stackoverflow.com/rooms/*
// ==/UserScript==
// edits by rlemon
// added auto hide
// refactored code, reduced DOM calls and improved readability
// removed the useless line that asked "is this the room you are looking for?" 
// improved performance by using native DOM api within jQuery. 
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
	$('.sidebar-widget .fr.msg-small').remove();
	var topbar = $(document.createElement('div')), chat_body = $(document.getElementById('chat-body')), top, hidden = false;
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
    topbar.append( $(document.getElementById('sidebar-menu')).detach() );
    chat_body.append(topbar);

	this.onresize = function() {
		_top = -(topbar.height() - 15);
		topbar.css('top', _top);
	};
	this.onresize();

	topbar.hover(function() {
		$(this).stop(true, true).animate({top:0}, 300); 
	}, function() {
		$(this).stop(false, false).animate({top:_top}, 300); 
	});
	
	$(this).scroll(function() {
		if( $(this).scrollTop() === 0 ) {
			topbar.stop(true, true).animate({left: -(topbar.width() - 6)},300);
			hidden = true;
			return;
		}
		if( hidden ) {
			topbar.stop(false, false).animate({left: 0},300);
		}		
	});
});

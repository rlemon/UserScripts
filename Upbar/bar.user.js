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
	var topbar = $("<div>");
	topbar.css({
		'position': 'fixed',
		'top': '-40px',
		'left': '0px',
		'z-index': '1',
		'width': '49%',
		'background-color': '#fff',
		'border-bottom': '2px solid #777',
		'box-shadow': '0px 5px 10px #777',
		'padding': '5px'
	});
    topbar.append( $('#present-users').detach() );
    topbar.append( $('#sidebar-menu').detach() );
    $('.sidebar-widget .fr.msg-small').remove();
	topbar.hover(function() {
		$(this).stop(true, true).animate({top:0}, 300); 
	}, function() {
		$(this).stop(false, false).animate({top:-40}, 300); 
	});
	
    $('#chat-body').append(topbar);
});

// ==UserScript==
// @name          UNICORNS
// @author        rlemon
// @version       1.0
// @namespace     rlemon.com
// @description	  UNICORNS
// @include       http://chat.stackexchange.com/rooms/*
// ==/UserScript==

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
EmbedCodeOnPage('(' + function_contents.toString() + ')()'); 
}

EmbedFunctionOnPageAndExecute(function() {

    $('.stars.vote-count-container').live('click', function() {
		var unicorn = $('<img>',{
			src: 'http://www.myspaceantics.com/images/myspace-graphics/glitter-graphics/pink-unicorn.gif',
			style: 'position: absolute; top: ' + $(this).offset().top + 'px; left: ' + $(this).offset().left + 'px; z-index: 999;'
		});
		$("body").append(unicorn);
		unicorn.animate({
			left: '-=2000px',
			top: '-=' + Math.floor(Math.random()*2000) + 'px'
		},1500, 'linear', function() {
			unicorn.remove();
		});
	});

});



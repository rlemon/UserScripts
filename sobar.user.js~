// ==UserScript==
// @name          UserUp
// @author        Amith kk
// @version       1.0
// @namespace amith.dasroot.net
// @description	  Moves the userlist to the top
// @include       http://chat.stackoverflow.com/rooms/*
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
EmbedCodeOnPage("(" + function_contents.toString() + ")()"); 
}

EmbedFunctionOnPageAndExecute(function() {

    
    $(document).scrollTo(999999999);
        $('body').append('<div id="topbar" style="position: fixed; top: 0px; left: 0px; z-index: 1; width: 49%; background-color: #fff; border-bottom: 2px solid #777; box-shadow: 0px 5px 10px #777; padding: 5px;"></div>')
    $('#topbar').append( $('#present-users').detach() );
    $('#topbar').append( $('#sidebar-menu').detach() );


});

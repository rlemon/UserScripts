// ==UserScript==
// @name          Unicorn Staring
// @author        Robert Lemon (from work by George Edison)
// @namespace     http://rlemon.com
// @description	  Brings back the dancing unicorns to the Star buttons
// @include       http://chat.stackexchange.com/rooms/*
// @include       http://chat.stackoverflow.com/rooms/*
// ==/UserScript==

// LICENSE        http://quickmediasolutions.com/unicorn/


function EmbedFunctionOnPageAndExecute(function_contents)
{
    var exec_script = document.createElement('script');
    exec_script.type = 'text/javascript';
    exec_script.textContent = "(" + function_contents.toString() + ")()";
    document.getElementsByTagName('head')[0].appendChild(exec_script);
}
function EmbedFunctionOnPage(function_name, function_contents)
{
    var exec_script = document.createElement('script');
    exec_script.type = 'text/javascript';
    exec_script.textContent = function_contents.toString().replace(/function ?/, 'function ' + function_name);
    document.getElementsByTagName('head')[0].appendChild(exec_script);
}

EmbedFunctionOnPage('DoStar', function(star_box, star) {

    var position = star_box.offset();
    
    if(star)
    {
        var url = 'http://i.imgur.com/EhQXl.gif';
        var top = 20;
        var height = 125;
    }
    else
    {
        var url = 'http://i.imgur.com/BhbcF.gif';
        var top = 65;
        var height = 116;
    }
    
    var data = $('<img src="' + url + '" style="position: absolute; top: ' + (position.top - top) + 'px; left: ' + (position.left - 140) + 'px; width: 128px; height: ' + height + 'px; z-index: 9999;"/>');
    $('body').append(data);
    
    window.setTimeout(function() {
        
        data.fadeOut(function() { $(this).remove(); });
        
    }, 4000);

});

EmbedFunctionOnPageAndExecute(function() {
    $('.stars.vote-count-container').live('click', function() {
		if( $(this).hasClass('user-star') ) {
			DoStar($(this).parent(), true);
		} else {
			DoStar($(this).parent(), false); 
		}
	});
});

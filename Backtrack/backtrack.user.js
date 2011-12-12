// ==UserScript==
// @name          BackTrack
// @author        rlemon
// @version       0.3
// @namespace     rlemon.com
// @description	  Makes the backspace button function as browser back button.
// @include       *
// ==/UserScript==

// util
function EmbedCodeOnPage(a){var b=document.createElement("script");b.type="text/javascript";b.textContent=a;document.getElementsByTagName("head")[0].appendChild(b)}function EmbedFunctionOnPageAndExecute(a){EmbedCodeOnPage("("+a.toString()+")()")};

EmbedFunctionOnPageAndExecute(function() {
	var BackTrackListener = function(event) {
		if (!event.ctrlKey && !event.altKey) {
			var target = event.target;
			if (event.which == 8 && target) {               
				if (target.type == 'text' || target.type == 'textarea' || target.type == 'password' || target.isContentEditable) {
					return true;
				} else {
					window.setTimeout(function() {
						BackTrack(event.shiftKey);
					}, 0);
					return false;
				}
			}
		}
		return true;
	}
	var BackTrack = function(forward) {
		if (!forward) {
			window.history.back();
		} else {
			window.history.forward();
		}
	}
	document.onkeydown = BackTrackListener;
});

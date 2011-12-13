// ==UserScript==
// @name          BackTrack
// @author        rlemon
// @version       0.3
// @namespace     rlemon.com
// @description   Gives Windows functionality to the Browser Backspace button.
// @include       *
// ==/UserScript==

function EmbedCodeOnPage(kode) {
    var elm = document.createElement('script');
    elm.textContent = kode;
    document.head.appendChild(elm);
}
function EmbedFunctionOnPageAndExecute(fn) {
    EmbedCodeOnPage("(" + fn.toString() + ")()");
}

EmbedFunctionOnPageAndExecute(function() {
    var BackTrackListener = function(event) {
        var target = event.target;
        if( isValidEvent(event) && isValidTarget(target) ) {
            window.setTimeout(function() {
                BackTrack(event.shiftKey);
            }, 0);
            return false;
        }
        return true;
    };
    var invalidTypes = {
        text : true,
        textarea : true,
        password : true
    };
    function BackTrack(forward) {
        var method = forward ? 'forward' : 'back';
        window.history[method]();
    }
    function isValidTarget(target) {
        return target && !( target.type in invalidTypes || target.isContentEditable );
    }
    function isValidEvent(event) {
        return !( event.ctrlKey || event.shiftKey ) && event.which === 8;
    }
    document.onkeydown = BackTrackListener;
});

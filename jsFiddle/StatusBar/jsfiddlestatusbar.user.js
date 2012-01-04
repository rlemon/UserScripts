// ==UserScript==
// @name          StatusBar
// @author        rlemon
// @version       0.1
// @namespace     rlemon.com
// @description   Adds a status bar to the jsFiddle 'JavaScript' pane.
// @include       http://jsfiddle.net/*
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
	var status_bar = document.createElement('div');
	status_bar.appendChild(document.createTextNode('Hello World!'));
	status_bar.style.position = 'absolute';
	status_bar.style.bottom = '0';
	status_bar.style.left = '0';
	status_bar.style.width = '100%';
	status_bar.style.backgroundColor = '#f00';
	var panel_js = document.getElementById('panel_js');
	var iframe = panel_js.getElementsByTagName('iframe')[0];
	var bod = document.body || document.documentElement;
	body.style.paddingBottom = "1.5em";
});

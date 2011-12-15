// ==UserScript==
// @name          dBar
// @author        rlemon
// @version       0.1
// @namespace     rlemon.com
// @description   implementation of DickBar in a userscript :D
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
	var opts = {
			"symbol": "&#10026;",
			"font-size": "64px",
			"color": "#eee",
			"time": 3000
	};
	var $dbar = $("<div>"), $dbar_symbol = $("<div>"), $dbar_trend = $("<div>"), $dbar_link = $("<a>");
	var dbar = function() { // readystate
		console.log('here');
		$.getJSON("http://api.twitter.com/1/trends/daily.json?callback=?", function(data) {
			var trending;
			$.each(data.trends, function(key, value) {
				trending = value;
			});
			
			$dbar.css({
				'position': 'fixed',
				'left': '0px',
				'z-index': '99999',
				'top': '0px',
				'width': '100%',
				'background-color': 'rgba(0,0,0,0.7)',
				'font-size': '64px',
				'font-family': 'helvetica,arial,sans-serif',
				'color': '#eee',
				'text-shadow': '0 2px 1px rgba(0,0,0,0.7)'
			});
			
			$dbar_symbol.css({
				'padding': '15px',
				'float': 'left',
				'width': '80px',
				'text-align': 'center',
				'margin-right': '5px',
				'border-right': 'solid 1px rgba(0,0,0,0.3)',
			});
			$dbar_symbol.append("&#10026;");
			
			$dbar_trend.css({
				'margin-left': '81px',
				'border-left': 'solid 1px rgba(255,255,255,0.2)',
				'font-weight': '700',
				'padding': '15px 20px'
			});
			
			$dbar_link.css({
				'color': '#eee',
				'text-decoration': 'none'
			});
			$dbar_link.attr('href', "http://twitter.com/search/" + encodeURIComponent(trending[0].query));
			$dbar_link.text(trending[0].name);
			$dbar_clear = $("<div>");
			$dbar_clear.css({
				'clear': 'both',
				'height': '1px',
				'font-size': '1px'
			});
			$dbar_clear.html('&#160;');
			$dbar.append($dbar_symbol);
			$dbar.append($dbar_trend);
			$dbar.append($dbar_link);
			$dbar.append($dbar_clear);
			$("body").prepend($dbar);
			var height = $("#dickbar").height();
			var half = height / 2;
			$dbar.append("<div style=\"position:fixed;left:0px;top:" + half + "px;width:100%;height:1px;font-size:1px;background-color:rgba(0,0,0,0.3);\">&#160;</div>");
			$dbar.append("<div style=\"position:fixed;left:0px;top:" + (half + 1) + "px;width:100%;height:1px;font-size:1px;background-color:rgba(255,255,255,0.2);\">&#160;</div>");
			$dbar.append("<div id=\"dickbar-frame\" style=\"display:none;position:fixed;left:0px;top:0px;width:100%;height:1px;font-size:1px;background-color:rgba(0,0,0,0.5);\">&#160;</div>");
			setTimeout(function() {
				dickbarUpdate(trending, 1, opts.time);
			}, opts.time);
		});
	};
	var dickbarUpdate = function(trending, i, time) {
		$("#dickbar-frame").show().animate({
			"height": $dbar.height()
		}, 100, function() {
			$("#dickbar-frame").hide().css({
				"height": 1
			});
			$dbar_link.attr("href", "http://twitter.com/search/" + encodeURIComponent(trending[i].query)).html(trending[i].name);
		});
		var next = i + 1;
		if (next >= trending.length) next = 0;
		setTimeout(function() {
			dickbarUpdate(trending, next, time);
		}, time);
	};

	/* Load jQuery - if you don't like it too bad. */
	if (!window.jQuery) {
		var elm = document.createElement('script');
		elm.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js";
		elm.onreadystatechange = function() {
			if (this.readyState == 'complete') dbar();
		}
		elm.onload = dbar;
		document.head.appendChild(elm);
	} else {
		dbar();
	}

});


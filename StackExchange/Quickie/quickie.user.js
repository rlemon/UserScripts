// ==UserScript==
// @name          Quickie
// @author        rlemon
// @version       0.2
// @namespace     rlemon.com
// @description   Mini-SO bar in any page, anywhere, anytime.
// @include       *
// ==/UserScript==

function EmbedCodeOnPage(kode) {
    var elm = document.createElement('script');
    elm.textContent = kode;
    document.head.appendChild(elm);
}

function EmbedFunctionOnPageAndExecute(fn) {
    EmbedCodeOnPage('(' + fn.toString() + ')()');
}

EmbedFunctionOnPageAndExecute(function() {
	var createCookie = function(name, value, days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			var expires = '; expires=' + date.toGMTString();
		}
		else var expires = '';
		document.cookie = name + '=' + value + expires + '; path=/';
	};
	var createandreturncookie = function(name, value, days) {
		createCookie(name, value, days);
		return value;
	};
	var readCookie = function(name) {
		var nameEQ = name + '=';
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	};
	var eraseCookie = function(name) {
		createCookie(name, '', -1);
	};
    var run = function() {
        var getSites = function(callback) {
			var i = readCookie('quickie_site_selection_i') || 0;
            $.ajax({
                dataType: 'jsonp',
                jsonp: 'jsonp',
                url: 'http://stackauth.com/1.1/sites',
                success: function(val) {
                    $.each(val.items, function(i, o) {
                        sites.push(this);
                        site_select.append('<option value="' + this.main_site.api_endpoint + '">' + this.main_site.name + '</option>');
                    });
                    site_select[0].selectedIndex = i;
					if( typeof callback == 'function') {
						callback.call();
					}
                },
                error: function(val) {
                    console.log('error');
                    console.log(arguments);
                }
            });
        };
        var getQuestions = function(i, endpoint, type) {
            $.ajax({
                dataType: 'jsonp',
                jsonp: 'jsonp',
                url: '' + endpoint + '/1.1/questions/' + type + '?pagesize=10',
                success: function(val) {
                    questions_container.empty();
                    var site = sites[i].main_site.site_url;
                    $.each(val.questions, function() {
                        var question = $("<div>");
                        question.css({
                            'padding': '4px 2px',
                            'border-top': '1px solid #000',
                            'border-bottom': '1px solid #000',
                            'text-align': 'left'
                        });
                        var vcount = $("<span>");
                        vcount.css({
                            'color': '#666',
                            'font-size': '12px',
                            'margin': '1px',
                            'padding': '1px 3px',
                            'background-color': '#efefef'
                        });
                        vcount.text(Math.floor(this.up_vote_count - this.down_vote_count));
                        vcount.attr('title', 'Vote Summary');
                        question.append(vcount);

                        var acount = $("<span>");
                        acount.css({
                            'color': '#222',
                            'font-size': '12px',
                            'margin': '1px',
                            'padding': '1px 3px',
                            'background-color': '#efefef'
                        });
                        acount.text(this.answer_count);
                        acount.attr('title', this.answer_count + ' Answers');
                        question.append(acount);

                        var views = $("<span>");
                        views.css({
                            'color': '#999',
                            'font-size': '12px',
                            'margin': '1px',
                            'padding': '1px 3px',
                            'background-color': '#efefef'
                        });
                        views.text(this.view_count);
                        views.attr('title', this.view_count + ' Views');
                        views.attr('target', '_blank');
                        question.append(views);

                        var title = $("<a>");
                        title.css({
							'text-decoration': 'none',
							'font-size': '12px',
							'color': '#222'
						});
                        title.text(this.title);
                        title.attr('href', site + '/questions/' + this.question_id);
						title.attr('target', '_blank');
                        question.append(title);


                        questions_container.append(question);
                    });
                },
                error: function(val) {
                    console.log('error');
                    console.log(arguments);
                }
            });
        };



        var container = $("<div>"),
            top_bar = $("<div>"),
            sub_bar = $("<div>"),
            questions_container = $("<div>"),
            site_select = $("<select>"),
            noanswers = $("<span>"),
            unanswered = $("<span>"),
            sites = [],
            hidden = true,
            down_text = '▼ Quickie Handle',
            up_text = '▲ Quickie Handle',
            selected_option,
            question_type;

        container.css({
            'position': 'fixed',
            'bottom': '-380px',
            'right': '5px',
            'height': '400px',
            'width': '300px',
            'background-color': '#fff',
            'box-shadow': '0px 5px 10px #777',
            'overflow': 'hidden',
            'z-index': '99999'
        });

        top_bar.css({
            'cursor': 'pointer',
            'height': '20px',
            'width': '100%',
            'background-color': '#ddd',
            'text-align': 'center'
        });

        sub_bar.css({
            'height': '24px',
            'width': '100%',
            'background-color': '#efefef'
        });
		
		var button_css = {
			'cursor': 'pointer',
			'padding': '2px 4px',
			'background-color': '#666',
			'color': '#fff',
			'margin-left': '4px'
		};
		noanswers.css(button_css);
		
		unanswered.css(button_css);
		
        questions_container.css({
            'overflow-y': 'scroll',
            'height': '356px'
        });

		noanswers.text('n');
		unanswered.text('u');
        top_bar.text(up_text);
        
        noanswers.attr('title', 'No-Answers');
        unanswered.attr('title', 'Unanswered');

        sub_bar.append(site_select).append(noanswers).append(unanswered);
        container.append(top_bar).append(sub_bar).append(questions_container);

		noanswers.bind('click', function() {
			selected_option = $(this);
			selected_option.css({'background-color': 'green','color':'#fff'});
			unanswered.css({'background-color': '#666', 'color':'#fff'});
			question_type = 'no-answers';
			site_select.trigger('change');
		});
		
		unanswered.bind('click', function() {
			selected_option = $(this);
			selected_option.css({'background-color': 'green','color':'#fff'});
			noanswers.css({'background-color': '#666', 'color':'#fff'});
			question_type = 'unanswered';
			site_select.trigger('change');
		});

        top_bar.bind('click', function() {
            hidden = !hidden;
            if (!hidden) {
                container.animate({
                    'bottom': '-1px'
                }, 300);
                $(this).text(down_text);
            } else {
                container.animate({
                    'bottom': '-380px'
                }, 300);
                $(this).text(up_text);
            }
        });

        site_select.bind('change', function() {
			var i = createandreturncookie('quickie_site_selection_i', this.selectedIndex, 14 * 24 * 60 * 60 * 1000);
			var val = createandreturncookie('quickie_site_selection', this.options[this.selectedIndex].value, 14 * 24 * 60 * 60 * 1000);
            getQuestions(i, val, question_type);
        });

        $('body').append(container);

        getSites(function() {
			noanswers.trigger('click');	
		});
		
		var runner = function() {
			console.log('updating question list');
			selected_option.trigger('click');
			setTimeout(function() {
				runner();
			}, 2 * 60 * 1000);
		};
		
		setTimeout(function() {
			runner();
		}, 2 * 60 * 1000);
		
    };

    /* Load jQuery - if you don't like it too bad. */
    if (!window.jQuery) {
        var elm = document.createElement('script');
        elm.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js';
        elm.onreadystatechange = function() {
            if (this.readyState == 'complete') run();
        }
        elm.onload = run;
        document.head.appendChild(elm);
    } else {
        run();
    }

});

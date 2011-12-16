// ==UserScript==
// @name          Quickie
// @author        rlemon
// @version       0.1
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
    var run = function() {
        var getSites = function() {

            $.ajax({
                dataType: 'jsonp',
                jsonp: 'jsonp',
                url: 'http://stackauth.com/1.1/sites',
                success: function(val) {
                    $.each(val.items, function(i, o) {
                        sites.push(this);
                        site_select.append('<option value="' + this.main_site.api_endpoint + '">' + this.main_site.name + '</option>');
                    });
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
                            'padding': '4px',
                            'border-top': '1px solid #000',
                            'border-bottom': '1px solid #000',
                            'text-align': 'left'
                        });
                        var vcount = $("<span>");
                        vcount.css({
                            'color': '#666',
                            'font-size': '14px',
                            'padding': '1px 3px',
                            'background-color': '#efefef'
                        });
                        vcount.text(Math.floor(this.up_vote_count - this.down_vote_count));
                        vcount.attr('title', 'Vote Summary');
                        question.append(vcount);

                        var acount = $("<span>");
                        acount.css({
                            'color': '#222',
                            'font-size': '14px',
                            'padding': '1px 3px',
                            'background-color': '#efefef'
                        });
                        acount.text(this.answer_count);
                        acount.attr('title', this.answer_count + ' Answers');
                        question.append(acount);

                        var views = $("<span>");
                        views.css({
                            'color': '#999',
                            'font-size': '14px',
                            'padding': '1px 3px',
                            'background-color': '#efefef'
                        });
                        views.text(this.view_count);
                        views.attr('title', this.view_count + ' Views');
                        views.attr('target', '_blank');
                        question.append(views);

                        var title = $("<a>");
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
            sites = [],
            hidden = false;

        container.css({
            'position': 'fixed',
            'bottom': '2px',
            'right': '5px',
            'height': '400px',
            'width': '300px',
            'background-color': '#fff',
            'box-shadow': '0px 5px 10px #777',
            'overflow': 'hidden'
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

        questions_container.css({
            'overflow-y': 'scroll',
            'height': '356px'
        });

        sub_bar.append(site_select);
        container.append(top_bar).append(sub_bar).append(questions_container);


        top_bar.text('Quickie Handle');

        top_bar.bind('click', function() {
            hidden = !hidden;
            if (!hidden) {
                container.animate({
                    'bottom': '-1px'
                }, 300);
            } else {
                container.animate({
                    'bottom': '-380px'
                }, 300);
            }
        });

        site_select.bind('change', function() {
            getQuestions(this.selectedIndex, this.options[this.selectedIndex].value, 'unanswered');
        });

        getSites();


        $('body').append(container);

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

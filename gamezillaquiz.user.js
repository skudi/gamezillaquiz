// ==UserScript==
// @name        gamezillaquiz
// @namespace   mdp
// @include     http://gamezilla.komputerswiat.pl/quiz-growy*
// 
// @version     1
// @grant       none
// ==/UserScript==
//

$(document).ready(function() {
		console.log('s');
		$('body').append("<button id='testmdp' style='position: absolute; left:0px; top: 0px; z-index:1000;'>show</button>");
		waitforquestion();
		console.log('f');
});

function waitforquestion() {
	if ($('.gq-image-question[src="/static/gfx/ajaxloader/ajax-loader.gif"]').length > 0) {
		console.log('w');
		setTimeout(waitforquestion, 200);
	} else {
		console.log('a');
		action();
	}
}


function action() {
		var filemappings = [
				['tf_1.jpg.aspx', 'the few']
			, ['gta.*', 'grand theft auto']
			, ['MoW_RT_12.jpg.aspx', 'Men of War Red Tide']
			, ['THRetake.*', 'Tony Hawk Ride']
		];
		//console.log('t:' + $('.gq-image-question').attr('src'));
		$('.gq-image.figure').css('height', '300px');
		$('.gq-image.figure').css('overflow-y', 'scroll');
		//$(document).scrollTop($('.gq-answers-holder').offset().top - 200);
		$('#testmdp').offset({'top': $('.gq-answers-holder').offset().top - 30, 'left': $('.gq-answers-holder').offset().left});
		//$('#testmdp').click(action);
		var filename = $('.gq-image-question').attr('src').split("/");
		filename = filename[filename.length -1];
		$('#testmdp').text(filename);
		console.log('filemappings: [' + filemappings + ']');
		for (i=0; i<filemappings.length; i++) {
			var fnre = new RegExp(filemappings[i][0], 'i');
			if (filename.match(fnre) != null) {
				filename = filemappings[i][1];
				break;
			}
		};
		var words = filename.match(/[a-z]+/gi);
		var regexp = new RegExp(words.join('|'), 'ig');
		console.log('filename: ' + filename + ': ' + regexp);
		var maxscore = 0;
		var bestId = 'none';
		$('.gq-radio > label').each(function(n) {
			var score = 0;
			if( (matches = $(this).text().match(regexp)) != null) {
				score = matches.length;
			}
			console.log(n + " " + $(this).attr('for') + ":("+score+") " + $(this).text());
			if (score > maxscore) {
				bestId = $(this).attr('for');
				maxscore = score;
			}
		});
		console.log("best (score:"  + maxscore + "): " + bestId);
		if (maxscore > 0) {
			/*
			$('#' + bestId).click();
			$('#' + bestId).change();
			$('.button3d.green').click();
			*/
			selected = $('label[for='+bestId+']');
			selected.css('color', 'green');
		} else {
			selected = $('.gq-radio > label').first();
		}
		console.log("selected: " + selected);
		selected.attr('bestAnswer', '1');
		$(document).scrollTop(selected.offset().top - 400);
		$('.gq-radio').change(function() {
			$('.button3d.green').click();
		});
}


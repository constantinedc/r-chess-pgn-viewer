var numboards = 0;

function pgnify(obj) {
	$(obj).find('.usertext-body').each(function(){
		var text = this.innerHTML;
		
		var start = text.indexOf('[pgn]');
		var end = text.indexOf('[/pgn]');
		
		var lasttag;

		while (start > -1 && end > -1){
			var id = 'rchess'+numboards++;
			var pgnstr = text.substring(start+5, end);
			pgnstr = pgnstr.replace(/\[pgn\]|\[\/pgn\]/, '');
			pgnstr = pgnstr.replace(/\//g, "\/");

			if (pgnstr.length > 10){
				pgnstr = pgnstr.replace(/<ol>\s<li>/g, '1.');
				var li = pgnstr.search(/<\/li>[\s\S]*<li>/);

				while(li && li!= -1){
					var fragment = pgnstr.substring(0, li);
					var lastdot = fragment.lastIndexOf('.');
					var ffragment = fragment.substring(lastdot-15, lastdot);
					var tempfrag = '';
					var num = NaN;
					while (isNaN(num)){
						var spacecheck = ffragment.length-1;
						while (ffragment.charAt(spacecheck) != ' ') {
							spacecheck--;
						}
						num = parseInt(ffragment.substr(spacecheck))+1;

						tempfrag = fragment.substr(0, lastdot-3);
						lastdot = tempfrag.lastIndexOf('.');
						ffragment = tempfrag.substring(lastdot-15, lastdot);
					}
					pgnstr = pgnstr.replace(/<\/li>[\s\S]<li>/, ' '+num+'.');

					li = pgnstr.search(/<\/li>[\s\S]<li>/);
				}

				this.innerHTML = this.innerHTML.replace(
					/\[pgn\][\s\S]*?\[\/pgn\]/im, 
					"<div><div><b><span id='"+id+"-whitePlayer'></span><span id='"+id+"-whiteElo'></span><span id='"+id+"-dash'></span><span id='"+id+"-blackPlayer'></span><span id='"+id+"-blackElo'></span></b></div><div id='"+id+"-container'></div>" +"<div id='"+id+"-moves' class='rchess-moves'></div></div><div style='clear:both; padding-bottom:5px'></div>"
				);

				pgnstr = pgnstr.replace(/<\/?[^>]+(>|$)/g, "");
				pgnstr = $.trim(pgnstr);

				var viewer = new PgnViewer({
					'boardName': id,
					'pgnString': pgnstr,
					'pieceSet' : 'merida',
					'pieceSize': 35,
					'loadImmediately': true,
					'moveAnimationLength': 0.3,
					'newlineForEachMainMove': true,
					'movesFormat': 'main_on_own_line',
					'autoScrollMoves': true,
				}, function(){
					$('.ct-back, .ct-forward, .ct-start, .ct-end, .ct-play, .ct-stop').css('display', 'inline');
					$($('#'+id+'-moves').children()[0]).remove();
				});

				if ($('#'+id+'-whitePlayer')[0].innerHTML.length){
					$('#'+id+'-dash')[0].innerHTML = ' - ';

					if ($('#'+id+'-whiteElo').html().length > 0){
						$('#'+id+'-whiteElo').html(' ('+$('#'+id+'-whiteElo').html()+')');
					}
					else {
						$('#'+id+'-whiteElo').html('');
					}
					if ($('#'+id+'-blackElo').html().length > 0){
						$('#'+id+'-blackElo').html(' ('+$('#'+id+'-blackElo').html()+')');
					}
					else {
						$('#'+id+'-blackElo').html('');
					}
				}
				else{
					$('#'+id+'-blackElo').html('');
					$('#'+id+'-whiteElo').html('');
				}

				if ($('#chesstempolink').length == 0){
					$('body').append(
						$("<small id='chesstempolink'>PGN viewer from: <a href='http://www.chesstempo.com'>chesstempo</a></small>")
					);
				}
			}
			else {
				this.innerHTML = this.innerHTML.replace( /\[pgn\][\s\S]*?\[\/pgn\]/im, "[ pgn]"+pgnstr+"[ /pgn] (sans spaces)");
			}

			text = this.innerHTML;
			start = text.indexOf('[pgn]');
			end = text.indexOf('[/pgn]');
		}
	});

	$('.ct-back, .ct-forward, .ct-start, .ct-end, .ct-play, .ct-stop')
		.css('display', 'inline');

	$('.ct-board-container')
		.css('float', 'left');

	$('.rchess-moves')
		.css('display', 'block')
		.css('margin-right', '10px')
		.css('margin-top', '5px')
		.css('max-height', '305px')
		.css('overflow-y', 'scroll');

	$('#chesstempolink')
		.css('position', 'fixed')
		.css('right', '2px')
		.css('bottom', '2px')
		.css('background', 'white');
}

function loadscript(url, callback) {
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.src = url;
	script.type = 'text/javascript';

	var done = false;
	script.onload = script.onreadystatechange = function() {
		if(!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') ) {
			done = true;
			callback();

			script.onload = script.onreadystatechange = null;
			head.removeChild( script );
		}
	};

	head.appendChild(script);
}

$('head').append($('<link>').attr('rel', 'stylesheet').attr('type', 'text/css').attr('href', 'http://chesstempo.com/css/board-min.css'));
loadscript('http://chesstempo.com/js/pgnyui.js', function(){
	loadscript('http://chesstempo.com/js/pgnviewer.js', function(){
		pgnify(document);
	});
});

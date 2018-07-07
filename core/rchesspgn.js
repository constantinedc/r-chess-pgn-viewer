var numboards = 0;

function processNodes(obj) {
  $(obj)
    .find('.usertext-body, .Post div, .Comment div, div.md')
    .filter(function(){
      return !$(this).find('div').length && this.innerHTML.includes('[pgn]');
    })
    .each(function(){
      var text = this.innerHTML;
      var pgnFound = [];

      var start = text.indexOf('[pgn]');
      var end = text.indexOf('[/pgn]');

      while (start > -1 && end > -1){
        var pgnstr = text.substring(start+5, end);
        pgnstr = pgnstr.replace(/\[pgn\]|\[\/pgn\]/, '');
        pgnstr = pgnstr.replace(/\//g, "\/");

        if (pgnstr.length > 10){
          pgnstr = pgnstr.replace(/<ol.*?>\s?<li.*?>/g, '1.');
          var liSearch = /<\/li>[^<]*<li.*?>/;
          var li = pgnstr.search(liSearch);

          // handle reddit's markdown gorking the pgn text.
          while(li && li!= -1){
            var fragment = pgnstr.substring(0, li);
            var lastdot = fragment.lastIndexOf('.');
            var ffragment = fragment.substring(lastdot-15, lastdot);
            var tempfrag = '';
            var num = NaN;

            while (isNaN(num)){
              var spacecheck = ffragment.length-1;
              while (/\S/.test(ffragment.charAt(spacecheck))) {
                spacecheck--;
              }
              num = parseInt(ffragment.substr(spacecheck))+1;

              tempfrag = fragment.substr(0, lastdot-3);
              lastdot = tempfrag.lastIndexOf('.');
              ffragment = tempfrag.substring(lastdot-15, lastdot);
            }
            pgnstr = pgnstr.replace(liSearch, ' '+num+'.');

            li = pgnstr.search(liSearch);
          }

          pgnstr = pgnstr.replace(/<\/?a.*?(>|$)/g, "");
          pgnstr = pgnstr.replace(/<\/?[^>]+(>|$)/g, " ");
          pgnstr = $.trim(pgnstr);

          var id = 'rchess'+numboards++;
          injectViewerHtml(this, id);
          pgnFound.push({id:id, pgnstr:pgnstr});
        }
        else {
          this.innerHTML = this.innerHTML.replace( /\[pgn\][\s\S]*?\[\/pgn\]/im, "[ pgn]"+pgnstr+"[ /pgn] (sans spaces)");
        }

        text = this.innerHTML;
        start = text.indexOf('[pgn]');
        end = text.indexOf('[/pgn]');
      }

      for (var i in pgnFound){
        initializePgnViewer(pgnFound[i].id, pgnFound[i].pgnstr);
      }
    });
}

function onViewerInit(id){
  $($('#'+id+'-moves').children()[0]).remove();
}

function injectViewerHtml(node, id){
  node.innerHTML = node.innerHTML.replace(
    /\[pgn\][\s\S]*?\[\/pgn\]/im,
    "<div><div><b><span id='"+id+"-whitePlayer'></span><span id='"+id+"-whiteElo'></span><span id='"+id+"-dash'></span><span id='"+id+"-blackPlayer'></span><span id='"+id+"-blackElo'></span></b></div><div id='"+id+"-container'></div>" +"<div id='"+id+"-moves' class='rchess-moves'></div></div><div style='clear:both; padding-bottom:5px'></div>"
  );

  if ($('#chesstempolink').length === 0){
    $('body').append(
      $("<small id='chesstempolink'>PGN viewer from: <a href='http://www.chesstempo.com'>chesstempo</a></small>")
    );
  }
}

function initializePgnViewer(id, pgnstr){
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
    'hidePGNErrors': true
  }, onViewerInit(id));

  if ($('#'+id+'-whitePlayer')[0].innerHTML.length){
    $('#'+id+'-dash')[0].innerHTML = ' - ';

    //ratings.
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
}

//Load CSS and JS for chesstempo pgn viewer, process all nodes, then watch for future nodes.
processNodes(document);
$(document).bind('DOMNodeInserted', function(e){
  if (!e) e = window.event;
  processNodes(e.target);
});

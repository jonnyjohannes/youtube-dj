$(document).ready(function() {
  $('#query-form').submit(function(event) {
    
    // Stop form from submitting normally
    event.preventDefault();

    // Get some values from elements on the page:
    var $form = $( this ),
      term = $form.find( 'input[name="query"]' ).val(),
      url = $form.attr( 'action' );
   
    // Send the data using post
    var posting = $.ajax({
      type: 'POST',
      url: url,
      data: JSON.stringify({ query: term }), 
      dataType: 'json',
      contentType: 'application/json'
    }).done(function(response) {
      renderResults(JSON.stringify(response));
      initDragDrop();
      initClickAdd();
      initFader();
    });
    
  });

  function initClickAdd() {
    $('.add-to-deck1').on('click', function() {
      var video = $(this).parents('td');
      var deck = $('#deck1-droppable');
      setDeck(deck, video); 
    });  
    $('.add-to-deck2').on('click', function() {
      var video = $(this).parents('td');
      var deck = $('#deck2-droppable');
      setDeck(deck, video); 
    });  
  }

  function initDragDrop() {
    $('.thumb-draggable').draggable({
      containment: 'html',
      helper: 'clone'
    });
    $('#deck1-droppable').droppable({
      drop: function(event, ui) {
        setDeck($(this), ui.draggable);
      }
    });
    $('#deck2-droppable').droppable({
      drop: function(event, ui) {
        setDeck($(this), ui.draggable);
      }
    });
  }

  function initFader() {
    $('#fader').slider();
  }

  function renderResults(response) {
    var table = "<table class='table table-bordered'>";
    $.each($.parseJSON(response).videos, function(i, video) {
      var video = video.snippet;
      if (i == 0 || i == 5) {
        table += "<tr>";
      }
      table += "<td>";
      table += "<div class='thumb-draggable'>";
      table += "<p>" + "<img src='" + video.thumbnails.default.url + "'>" + "</p>";
      //table += "<p>" + JSON.stringify(video) + "</p>";
      table += "<p class='embed_html' style='display:none;'>" + video.thumbnails.default.url.substr(23,35).substr(0,11) + "</p>";
      table += "<p class='video_id' style='display:none;'>" + video.channelId + "</p>";
      table += "</div>";
      table += "<p>";
      table += "<div class='btn-group'>";
      table += "<button class='add-to-deck1 btn'>Deck 1</button>"
      table += "<button class='add-to-deck2 btn'>Deck 2</button>"
      table += "</div>";
      table += "<p>";
      table += "</td>";
      if (i == 4 || i == 9) {
        table += "</tr>";
      }
    });
    table += "</table>";
    $('#video-list').empty().html(table);
  }
  
  function setDeck(deck, video) {

    embed = "<div class='embed-responsive embed-responsive-16by9' id=a"+deck.attr('id')+"><div>";
    deck.html(embed);

    responsive_embed = $('#a'+deck.attr('id'));
  
    swfobject.embedSWF("http://www.youtube.com/v/"+video.find('.embed_html').text()+"?enablejsapi=1&playerapiid=ytplayer&version=3", 'a'+deck.attr('id'), responsive_embed.width(), responsive_embed.outerHeight(), "8", null, null, {allowScriptAccess: "always"}, {id: deck.attr('id')+"-player"});

    setSlider();

  }

  function setSlider() {
    $('#fader').on('slide', function(event, ui) {
      deck1 = document.getElementById('deck1-droppable-player');
      deck2 = document.getElementById('deck2-droppable-player');

      slider_value = $('#fader').slider('value');

      deck1.setVolume(100 - slider_value);
      deck2.setVolume(slider_value);
    });
  }

});


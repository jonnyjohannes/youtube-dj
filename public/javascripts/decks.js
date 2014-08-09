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

  function renderResults(response) {
    var table = "<table class='table table-striped'>";
    $.each($.parseJSON(response).videos, function(i, video) {
      var video = video.snippet;
      table += "<tr>";
      table += "<td>";
      table += "<div class='thumb-draggable'>";
      table += "<p>" + "<img src='" + video.thumbnails.medium.url + "'>" + "</p>";
      table += "<p>" + video.title + "</p>";
      table += "<p class='embed_html' style='display:none;'>" + video.channelId + "</p>";
      table += "<p class='video_id' style='display:none;'>" + video.channelId + "</p>";
      table += "</div>";
      table += "<p>";
      table += "<div class='btn-group'>";
      table += "<button class='add-to-deck1 btn'>Deck 1</button>"
      table += "<button class='add-to-deck2 btn'>Deck 2</button>"
      table += "</div>";
      table += "<p>";
      table += "</td>";
      table += "</tr>";
    });
    table += "</table>";
    $('#video-list').empty().html(table);
  }
  
  function setDeck(deck, video) {
    deck.html(video.find('.embed_html').text());
    $('iframe').each(function(index, elem) {
      elem.setAttribute('width','100%');
    });
  }

});


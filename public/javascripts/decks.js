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
      data: {query: term}, 
      dataType: 'script'
    }).done(function() {
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
  
  function setDeck(deck, video) {
    deck.html(video.find('.embed_html').text());
    $('iframe').each(function(index, elem) {
      elem.setAttribute('width','100%');
    });
  }

});


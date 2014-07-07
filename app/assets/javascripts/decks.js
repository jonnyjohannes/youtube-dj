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
    });
    
  });

  function initDragDrop() {
    $('.thumb-draggable').draggable({
      containment: 'html',
      helper: 'clone'
    });
    $('#deck1-droppable').droppable({
      drop: function(event, ui) {
        setDeck($(this), ui);
      }
    });
    $('#deck2-droppable').droppable({
      drop: function(event, ui) {
        setDeck($(this), ui);
      }
    });
  }

  function setDeck(dropArea, ui) {
    var draggableVideo = ui.draggable;
    dropArea.html(draggableVideo.children('.embed_html').text());
    $('iframe').each(function(index, elem) {
      elem.setAttribute('width','100%');
    });
  }

});


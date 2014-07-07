var decks = (function($, window, document, undefined) {

  var init = function() {
    initSearch();
  };

  var initSearch = function() {
    $('#query-form').submit(function(event) {
      
      // Stop form from submitting normally
      event.preventDefault();

      // Get some values from elements on the page:
      var $form = $( this ),
        term = $form.find( "input[name='query']" ).val(),
        url = $form.attr( "action" );
     
      // Send the data using post
      var posting = $.ajax({
        type: 'POST',
        url: url,
        data: {query: term}, 
        dataType: 'script'
      });
      
    });
  };

})(jQuery, window, document);

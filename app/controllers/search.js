module.exports.controller = function(app) {
  return app.post('/search', function(req, res) {
    var Youtube = require('youtube-api');

    Youtube.authenticate({
      type: 'key',
      //key: process.env.YOUTUBE_API_KEY 
      key: 'AIzaSyDu0qPJoj0xXte8qegfXHI1GmjdY6DQlGM'
    });

    var query = req.body['query'];

    Youtube.search.list({
      'part': 'id, snippet',
      'q': query,
      'maxResults': 10
    }, function (err, data) {
      return res.json({videos: data.items});
    });
  });
};


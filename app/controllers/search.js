module.exports.controller = function(app) {
  return app.post('/search', function(req, res) {
    var query = req.body['query'];
    var videos = 'hlllllllooooo';
    var response = res.json({videos: videos});
    console.log(response.data);
    return response;
    //return res.json({data: data});
  });
};


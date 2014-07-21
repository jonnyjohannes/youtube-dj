module.exports.controller = function(app) {
  return app.get('/', function(req, res) {
    return res.render('index', {title: 'YouTubeDJ'});
  });
};


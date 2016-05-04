var express = require('express'),
  login = require('./login'),
  chirps = require('./chirps'),
  port = process.env.NODE_PORT || 3002; //Service listening here

express()
  .set('view engine', 'ejs')
  .use(express.static('./public'))
  .use(login.routes)
  .use(chirps.routes)
  .get('*', login.required, function (req, res) {
    console.log(req.user);
    res.render('index', {
      user: login.safe(req.user)
    });
  })
  .listen(port, function () {
    console.log('App on port ' + port);
  });

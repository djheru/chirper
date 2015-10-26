var express = require('express'),
  login = require('./login'),
  chirps = require('./chirps');

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
  .listen(4000);

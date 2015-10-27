var router = require('express').Router(),
  login = require('./login'),
  locallyDb = require('locallydb'),
  db = new locallyDb('./.data'),
  chirps = db.collection('chirps');

router.route('/api/chirps')
  .all(login.required)
  .get(function (req, res) {
    console.log(chirps.toArray());
    res.json(chirps.toArray());
  })
  .post(function (req, res, next) {
    var chirp = req.body;
    chirp.userId = req.user.cid;

    chirp.username = req.user.username;
    chirp.fullname = req.user.fullname;
    chirp.email = req.user.email;

    var id = chirps.insert(chirp);
    res.json(chirps.get(id));
  });

module.exports.routes = router;

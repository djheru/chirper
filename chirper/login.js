var passport = require('passport'),
  LocalStrategy = require('passport-local'),
  LocallyDb = require('locallydb'),
  db = new LocallyDb('./.data'),
  users = db.collection('users'),
  crypto = require('crypto'),
  router = require('express').Router(),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  expressSession = require('express-session'),
  hash = function (password) {
    return crypto
      .createHash('sha512')
      .update(password)
      .digest('hex');
  };

passport.use(new LocalStrategy(function (username, password, done) {

  var user = users
    .where({ username: username, passwordHash: hash(password) })
    .items[0];

  done(null, user || false);

}));

passport.serializeUser(function (user, done) {
  done(null, user.cid)
});

passport.deserializeUser(function (cid, done) {
  done(null, users.get(cid));
});

//parse post body on login page
router.use(bodyParser.urlencoded({ extended: true }));

//API requests
router.use(bodyParser.json());

//
router.use(cookieParser());

router.use(expressSession({
  secret: 'alsdfk',
  resave: false,
  saveUninitialized: true
}));

router.use(passport.initialize());
router.use(passport.session());

router.get('/login', function (req, res) {
  res.render('login');
});

router.post('/signup', function (req, res, next) {
  if (users.where({ username: req.body.username }).items.length === 0) {

    var user = {
      fullname: req.body.username,
      email: req.body.email,
      username: req.body.username,
      passwordHash: hash(req.body.password),
      following: []
    };

    var userId = users.insert(user);

    req.login(users.get(userId), function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });

  } else {
    res.redirect('/login');
  }
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/login');
});

function loginRequired (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect('/login');
  }
}

function makeUserSafe (user) {
  var safeUser = {},
    safeKeys = ['cid', 'fullname', 'email', 'username', 'following'];

  safeKeys.forEach(function (k) {
    safeUser[k] = user[k];
  });
  return safeUser;
}

exports.routes = router;
exports.required = loginRequired;
exports.safe = makeUserSafe;

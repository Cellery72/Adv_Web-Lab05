var express = require('express');
var router = express.Router();

// reference the Account model
var Account = require('../models/account');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Lab 5',
    message: 'Authentication with Passport',
    user: req.user
  });
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register', {
    'title': 'Register',
    user: req.user
  });
});

/* POST register page */
router.post('/register', function(req, res, next) {
  
  // create a new account
  Account.register(new Account({ username: req.body.username }), req.body.password,
      function(err, account) {
        if (err) {
          console.log(err);
          res.redirect('/error');
        }
        else {
          res.redirect('/login', { user: req.user });
        }
      }
  );

});


/* GET login page. */
router.get('/login', function(req, res, next) {

  if (req.user) {
    res.redirect('/users');
  }
  else {
    res.render('login', {
      'title': 'Login',
      failureMessage: '',
      user: req.user
    });
  }
});
/* POST login page. */
router.post('/login', passport.authenticate('local',
    {
      successRedirect: '/users',
      failureRedirect: '/login',
      failureMessage: 'Invalid Login'
    }
));

/* GET logout */
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/login');
});

// middlewear function to handle authorized routes
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/login');
    }
}
module.exports = router;

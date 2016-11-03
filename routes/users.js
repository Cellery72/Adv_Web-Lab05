var express = require('express');
var router = express.Router();
var User = require('../models/account');

/* GET users listing. */
router.get('/', isLoggedIn, function (req, res, next) {

	// Get all USERS
	User.find(function (err, users) {

		if (err) {
			// errror, let's do something about it 
			console.log(err);
			res.redirect('error');
		} else {

			// successfully load users page
			res.render('users', {
				title: 'Current User List',
				users: users,
				user: req.user
			})
		}
	});
});

// check if user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/login');
    }
}

module.exports = router;
var express = require('express'),
    router = express.Router(),
    emailValidator = require('email-validator'),
    middlewares = rootRequire('routes/middlewares'),
    authentication = rootRequire('lib/api/authentication');

// RESTful handlers to manage users

// Log user in
router.post('/login', function(req, res, next) {

    // Validate fields
    if (!req.body.email || !req.body.password) {
        return res.json({
            success: false,
            message: "Please fill in all the required fields."
        });
    }
    if (req.body.email.length > 255) {
        return res.json({
            success: false,
            message: "Email address is too long."
        });
    }
    if (req.body.password.length > 255) {
        return res.json({
            success: false,
            message: "Password is too long."
        });
    }

    // Login user
    authentication.login({
        email: req.body.email,
        password: req.body.password
    }, function(err, response) {
        if (err) {
            return res.json({
                success: false,
                message: "There was an error logging you in."
            });
        }
        if (response.token) {
            res.cookie('x_access_token', response.token, {
                httpOnly: true,
                signed: true
                    //secure: true for production --> but not working on postman
            });
        }
        return res.json(response);
    })
});

// Log user out
router.get('/logout', function(req, res, next) {
    res.clearCookie('x_access_token');
    return res.json({
        success: true
    })
});

// Is the user logged in?
router.get('/loggedin', middlewares.optionalToken, function(req, res, next) {
    if (req.decoded.userId) {
        return res.json({
            success: true
        })
    } else {
        return res.json({
            success: false
        })
    }
});

// Register a new user
router.post('/register', function(req, res, next) {

    // Validate fields
    if (!req.body.email || !req.body.password || !req.body.firstName || !req.body.lastName) {
        return res.json({
            success: false,
            message: "Please fill in all the required fields."
        });
    }
    if (req.body.email.length > 255) {
        return res.json({
            success: false,
            message: "Email address is too long."
        });
    }
    if (!emailValidator.validate(req.body.email)) {
        return res.json({
            success: false,
            message: "Invalid email address."
        });
    };
    if (req.body.password.length > 255) {
        return res.json({
            success: false,
            message: "Password is too long."
        });
    }
    if (req.body.password.length < 8) {
        return res.json({
            success: false,
            message: "Your password must be at least 8 characters long."
        });
    }
    if (req.body.firstName.length > 100) {
        return res.json({
            success: false,
            message: "First name is too long."
        });
    }
    if (req.body.lastName.length > 100) {
        return res.json({
            success: false,
            message: "Last name is too long."
        });
    }

    // Sign up user
    authentication.register({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }, function(err, response) {
        if (err) {
            return res.json({
                success: false,
                message: err.message
            });
        } else {
            return res.json({
                success: true
            });
        }
    })
});

module.exports = router;

var express = require('express'),
    router = express.Router(),
    middlewares = rootRequire('routes/middlewares'),
    accountSettings = rootRequire('lib/api/accountSettings');

// Change password
router.put('/password', function(req, res, next) {

    // Validate fields
    if (req.body.password.length > 255) {
        return res.json({
            success: false,
            message: "Password is too long."
        });
    }
    if (req.body.password.length < 8) {
        return res.json({
            success: false,
            message: "Password must have a minimum of 8 characters."
        });
    }

    // Change password
    accountSettings.changePassword({
        userId: req.decoded.userId,
        password: req.body.password
    }, function(err, response) {
        if (err) {
            return res.json({
                success: false,
                message: "There was an error changing your password."
            });
        } else {
            return res.json(response);
        }
    })
});

// Delete the user's account
router.delete('/', function(req, res, next) {

    accountSettings.deleteAccount({
        userId: req.decoded.userId
    }, function(err, response) {
        if (err) {
            return res.json({
                success: false,
                message: 'An error occured while deleting your account.'
            });
        } else {
            res.clearCookie('x_access_token');
            return res.json({
                success: true
            });
        }
    })
});

// Fetch the account data
router.get('/', function(req, res, next) {

    accountSettings.getAccountDetails({
        userId: req.decoded.userId
    }, function(err, response) {
        if (err) {
            return res.json({
                success: false,
                message: 'An error occured while fetching your account details.'
            });
        } else {
            return res.json({
                success: true,
                accountDetails: response.accountDetails
            });
        }
    })
});

// Modify the user's account data
router.put('/', function(req, res, next) {

    // Validate fields
    if (!req.body.firstName || !req.body.lastName) {
        return res.json({
            success: false,
            message: "Please fill in all the required fields."
        });
    }
    if (req.body.firstName.length > 255) {
        return res.json({
            success: false,
            message: "First name is too long."
        });
    }
    if (req.body.lastName.length > 255) {
        return res.json({
            success: false,
            message: "Last name is too long."
        });
    }

    accountSettings.setAccountDetails({
        userId: req.decoded.userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }, function(err, response) {
        if (err) {
            return res.json({
                success: false,
                message: 'An error occured while updating your account details.'
            });
        } else {
            return res.json({
                success: true
            });
        }
    })
});

module.exports = router;

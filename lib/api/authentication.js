var dbModel = rootRequire('lib/models/dbModel'),
    config = rootRequire('config.json')[process.env.NODE_ENV || 'dev'],
    cryptoHelper = rootRequire('lib/utils/cryptoHelper'),
    jwtHelper = rootRequire('lib/utils/jwtHelper'),
    emailValidator = require('email-validator'),
    logger = require('winston');

// Authentication Controller
var authentication = {

    // Register a new user
    register: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        if (!emailValidator.validate(data.email)) {
            return callback({
                success: false,
                message: "Invalid email address."
            });
        };

        cryptoHelper.generateToken(function(err, token) {
            if (err) {
                return callback(err);
            }

            cryptoHelper.hashPassword(data.password, function(err, hashData) {
                if (err) {
                    return callback(err);
                }
                dbModel.addNewUser({
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    password: data.password
                }, function(err, response) {
                    if (err) {
                        logger.error("An error occured while registering a new user. Err: " + err);
                        return callback(err);
                    } else {
                        return callback(null, {
                            success: true
                        });
                    }
                })
            });

        });
    },

    // Log a user in, by checking the login credentials. Returns the userId
    login: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        dbModel.getUserByEmail({
            email: data.email
        }, function(err, response) {
            if (response.success) {
                // User found
                cryptoHelper.verifyPassword(data.password, response.passwordSalt, response.passwordHash, function(err, result) {

                    if (err) {
                        return callback(err);
                    }

                    if (!result.passwordMatches) {
                        return callback(null, {
                            success: false,
                            message: 'Incorrect password'
                        })
                    }

                    jwtHelper.signToken({
                        userId: response.userId
                    }, function(err, tokenResponse) {
                        if (err) {
                            return callback(err);
                        } else {
                            return callback(null, {
                                success: true,
                                token: tokenResponse.token
                            })
                        }
                    })

                });
            } else {
                // User not found
                return callback(null, {
                    success: false,
                    message: 'We’re sorry, but it appears we don’t have an account with this email address.'
                });
            }
        })
    }

};

module.exports = authentication;

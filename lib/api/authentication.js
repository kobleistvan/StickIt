var dbModel = rootRequire('lib/models/dbModel'),
    config = rootRequire('config.json')[process.env.NODE_ENV || 'dev'],
    cryptoHelper = rootRequire('lib/utils/cryptoHelper'),
    jwtHelper = new (rootRequire('lib/utils/jwtHelper'))(),
    logger = require('winston');

// Authentication Controller
var authentication = {

    // Register a new user
    register: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        // Check if a user is already registered
        dbModel.getUserByEmail({
            email: data.email
        }, function(err, response) {
            if (err) {
                if (err.error.message === "Can't find dataPath: /users. Stopped at users") {
                    logger.info("Initialized database.");
                } else {
                    logger.error("An error occured while checking if a user is already registered or not. Err: " + err);
                    return callback(err);
                }
            } else {
                if (response.user) {
                    return callback(new Error("User already registered. Please log in"));
                }
            }

            // Hash the user-defined password
            cryptoHelper.hashPassword(data.password, function(err, hashData) {
                if (err) {
                    return callback(err);
                }
                dbModel.addNewUser({
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    passwordSalt: hashData.saltBase64,
                    passwordHash: hashData.derivedKeyBase64
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

        })

    },

    // Log a user in, by checking the login credentials. Returns the userId
    login: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        dbModel.getUserByEmail({
            email: data.email
        }, function(err, response) {
            if (response.success && response.user) {
                // User found
                cryptoHelper.verifyPassword(data.password, response.user.userData.passwordSalt, response.user.userData.passwordHash, function(err, result) {

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
                        userId: response.user.userId
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

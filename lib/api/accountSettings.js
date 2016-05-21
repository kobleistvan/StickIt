var dbModel = rootRequire('lib/models/dbModel'),
    cryptoHelper = rootRequire('lib/utils/cryptoHelper'),
    logger = require('winston');

var accountSettings = {

    // Retrieves the account details of a user
    getAccountDetails: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        dbModel.getUserAccountDetails({
            userId: data.userId
        }, function(err, response) {
            if (err) {
                return callback(err);
            } else {
                return callback(null, {
                    success: true,
                    accountDetails: response.accountDetails
                })
            }
        })
    },

    setAccountDetails: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        dbModel.setUserAccountDetails({
            userId: data.userId,
            firstName: data.firstName,
            lastName: data.lastName
        }, function(err, response) {
            if (err) {
                return callback(err);
            } else {
                return callback(null, {
                    success: true
                })
            }
        })
    },

    // Set a new password. Generates a new salt and saves the hash into the database.
    setPassword: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        cryptoHelper.hashPassword(data.password, function(err, hashData) {
            if (err) {
                return callback(err);
            }

            dbModel.updateUserPassword({
                userId: data.userId,
                passwordSalt: hashData.saltBase64,
                passwordHash: hashData.derivedKeyBase64,
            }, function(err, response) {
                if (err) {
                    return callback(err);
                } else {
                    return callback(null, {
                        success: true
                    });
                }
            })
        })
    },

    // Deletes a user's account permanently
    deleteAccount: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        dbModel.deleteUser({
            userId: data.userId
        }, function(err, response) {
            if (err) {
                return callback(err);
            } else {
                return callback(null, {
                    success: true
                })
            }
        })
    }

};

module.exports = accountSettings;

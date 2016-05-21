var crypto = require('crypto');

var cryptoHelper = {

    // Generates a random token of 32 bytes and returns it in hex
    generateToken: function(callback) {
        callback = (typeof callback === 'function') ? callback : function() {};
        crypto.randomBytes(32, function(err, buffer) {
            if (err) {
                return callback(err);
            }
            return callback(null, buffer.toString('hex'));
        })
    },

    // Hashes a password with a 32-byte salt, with 100.001 iterations, through sha-512 generating a 512-byte key. Returns it, also in base64 and returns the salt used and salt in base 64.
    hashPassword: function(password, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};
        crypto.randomBytes(32, function generateSalt(err, salt) {
            if (err) {
                return callback(err);
            } else {
                crypto.pbkdf2(password, salt, 100001, 512, 'sha512', function hashPassword(err, derivedKey) {
                    if (err) {
                        return callback(err);
                    } else {
                        return callback(null, {
                            derivedKey: derivedKey,
                            derivedKeyBase64: derivedKey.toString('base64'),
                            salt: salt,
                            saltBase64: salt.toString('base64')
                        })
                    }
                })
            }
        });
    },

    // Verifies if the password hashed with the saltB64 is equal or not with hashB64
    verifyPassword: function(password, saltB64, hashB64, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};
        var salt = new Buffer(saltB64, 'base64'),
            hash = new Buffer(hashB64, 'base64');

        crypto.pbkdf2(password, salt, 100001, 512, 'sha512', function hashPassword(err, derivedKey) {
            if (err) {
                return callback(err);
            } else {
                if (hash.equals(derivedKey)) {
                    return callback(null, {
                        passwordMatches: true
                    });
                } else {
                    return callback(null, {
                        passwordMatches: false
                    });
                }
            }
        })
    }
};

module.exports = cryptoHelper;

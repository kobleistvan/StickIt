var JsonDB = require('node-json-db'),
    shortId = require('shortid'),
    moment = require('moment');

var db = new JsonDB("./database/stickyNotesDB", true, true);

var dbModel = {

    // Return all the stickynotes of a user
    getAllStickyNotes: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        var stickyNotes;

        try {
            stickyNotes = db.getData("/users/" + data.userId + "/notes");
        } catch (error) {
            return callback({
                error: error,
                message: "An error occured while parsing the database."
            });
        }

        return callback(null, {
            success: true,
            stickyNotes: stickyNotes
        });
    },

    // Return a single stickynote of a user
    getStickyNote: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        var stickyNote;

        if (!shortId.isValid(data.stickyNoteId)) {
            return callback({
                error: new Error("Stickynote id seems to be invalid."),
                message: "Stickynote id seems to be invalid."
            });
        }

        try {
            stickyNote = db.getData("/users/" + data.userId + "/notes/" + data.stickyNoteId);
        } catch (error) {
            return callback({
                error: error,
                message: "An error occured while parsing the database."
            });
        }

        return callback(null, {
            success: true,
            stickyNote: stickyNote
        });
    },

    // Add a new stickynote for a user
    addStickyNote: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        var stickyNoteId = shortId.generate();

        try {
            db.push("/users/" + data.userId + "/notes/" + stickyNoteId, {
                note: data.note,
                modifiedAt: moment()
            }, false);
        } catch (error) {
            return callback({
                error: error,
                message: "An error occured while saving an item into the database."
            });
        }

        return callback(null, {
            success: true,
            stickyNoteId: stickyNoteId
        })
    },

    // Edit an existing stickynote for a user
    editStickyNote: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        if (!shortId.isValid(data.stickyNoteId)) {
            return callback({
                error: new Error("Stickynote id seems to be invalid."),
                message: "Stickynote id seems to be invalid."
            });
        }

        try {
            db.push("/users/" + data.userId + "/notes/" + data.stickyNoteId, {
                note: data.note,
                modifiedAt: moment()
            }, false);
        } catch (error) {
            return callback({
                error: error,
                message: "An error occured while updating an item from the database."
            });
        }

        return callback(null, {
            success: true
        })
    },

    // Remove an existing stickynote for a user
    deleteStickyNote: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        if (!shortId.isValid(data.stickyNoteId)) {
            return callback({
                error: new Error("Stickynote id seems to be invalid."),
                message: "Stickynote id seems to be invalid."
            });
        }

        try {
            db.delete("/users/" + data.userId + "/notes/" + data.stickyNoteId);
        } catch (error) {
            return callback({
                error: error,
                message: "An error occured while deleting an item from the database."
            });
        }

        return callback(null, {
            success: true
        })
    },

    // Adds a new user into the database
    addNewUser: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        try {
            db.push("/users/" + shortId.generate(), {
                userData: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    passwordHash: data.passwordHash,
                    passwordSalt: data.passwordSalt,
                    registrationDate: moment()
                },
                notes: {}
            }, false);
        } catch (error) {
            return callback({
                error: error,
                message: "An error occured while saving an item into the database."
            });
        }

        return callback(null, {
            success: true
        })
    },

    // Search and return a user by email
    getUserByEmail: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        var users;
        var foundUser;

        try {
            users = db.getData("/users");
        } catch (error) {
            return callback({
                error: error,
                message: "An error occured while parsing the database."
            });
        }

        var userKeys = Object.keys(users);

        for (var i = 0; i < userKeys.length; i++) {
            var key = userKeys[i];

            var currentEmail = users[key].userData.email;
            if (currentEmail === data.email) {
                foundUser = users[key];
                foundUser.userId = key;
                break;
            }
        }

        return callback(null, {
            success: true,
            user: foundUser
        })
    },

    // Delete an existent user from the database
    deleteUserById: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        if (!shortId.isValid(data.userId)) {
            return callback({
                error: new Error("User id seems to be invalid."),
                message: "User id seems to be invalid."
            });
        }

        try {
            db.delete("/users/" + data.userId);
        } catch (error) {
            return callback({
                error: error,
                message: "An error occured while deleting an item from the database."
            });
        }

        return callback(null, {
            success: true
        })
    },


    // Changes the password of a user
    updateUserPassword: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        try {
            db.push("/users/" + data.userId + "/userData/passwordHash", data.passwordHash, false);
            db.push("/users/" + data.userId + "/userData/passwordSalt", data.passwordSalt, false);
        } catch (error) {
            return callback({
                error: error,
                message: "An error occured while saving an item into the database."
            });
        }

        return callback(null, {
            success: true
        })
    },

    // Changes the firstName and lastName of a user
    setUserAccountDetails: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        try {
            db.push("/users/" + data.userId + "/userData/firstName", data.firstName, false);
            db.push("/users/" + data.userId + "/userData/lastName", data.lastName, false);
        } catch (error) {
            return callback({
                error: error,
                message: "An error occured while saving an item into the database."
            });
        }

        return callback(null, {
            success: true
        })
    },

    // Search and return a user by email
    getUserAccountDetails: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        var accountDetails;

        try {
            accountDetails = db.getData("/users/" + data.userId + "/userData");
        } catch (error) {
            return callback({
                error: error,
                message: "An error occured while parsing the database."
            });
        }

        return callback(null, {
            success: true,
            accountDetails: {
                firstName: accountDetails.firstName,
                lastName: accountDetails.lastName,
                email: accountDetails.email,
                registrationDate: accountDetails.registrationDate
            }
        })
    },

};

module.exports = dbModel;

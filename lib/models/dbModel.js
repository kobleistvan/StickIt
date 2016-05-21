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


    addNewUser: function(data, callback) {
        //TODO
    },
    getUserByEmail: function(data, callback) {
        //TODO
    },
    deleteUserById: function(data, callback) {
        //TODO
    }

};

module.exports = dbModel;

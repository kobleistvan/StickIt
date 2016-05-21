var JsonDB = require('node-json-db');
var ShortId = require('shortid');

var db = new JsonDB("./database/stickyNotesDB.json", true, true);

var stickyNotes = {

    // Return all the stickynotes of a user
    getAllStickyNotes: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        var stickyNotes;
        var mockCurrentUserId = "abcd12d4";

        try {
            stickyNotes = db.getData("/users/" + mockCurrentUserId + "/notes");
        } catch (error) {
            console.error(error);
            return callback("An error occured while parsing the database.", error);
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
        var mockCurrentUserId = "abcd12d4";
        var stickyNoteId = "B1jpNeRz";

        try {
            stickyNote = db.getData("/users/" + mockCurrentUserId + "/notes/" + stickyNoteId);
        } catch (error) {
            console.error(error);
            return callback("An error occured while parsing the database.", error);
        }

        return callback(null, {
            success: true,
            stickyNote: stickyNote
        });

    },

    // Add a new stickynote for a user
    addStickyNote: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        var mockCurrentUserId = "abcd12d4";
        var stickyNoteId = ShortId.generate();

        try {
            db.push("/users/" + mockCurrentUserId + "/notes/" + stickyNoteId, {
                note: data.note,
                dateTime: "2016-01-01 22:00:00"
            }, false);
        } catch (error) {
            return callback("An error occured while saving an item into the database.", error);
        }

        return callback(null, {
            success: true,
            stickyNoteId: stickyNoteId
        })

    },

    // Edit an existing stickynote for a user
    editStickyNote: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        // var mockCurrentUserId = "abcd12d4";
        // var stickyNoteId = ShortId.generate();

        // try {
        //     db.push("/users/" + mockCurrentUserId + "/notes/" + stickyNoteId, {
        //         note: data.note,
        //         dateTime: "2016-01-01 22:00:00"
        //     }, false);
        // } catch (error) {
        //     return callback("An error occured while saving an item into the database.", error);
        // }

        // return callback(null, {
        //     success: true,
        //     stickyNoteId: stickyNoteId
        // })

    },

    // Remove an existing stickynote for a user
    deleteStickyNote: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        // var mockCurrentUserId = "abcd12d4";
        // var stickyNoteId = ShortId.generate();

        // try {
        //     db.push("/users/" + mockCurrentUserId + "/notes/" + stickyNoteId, {
        //         note: data.note,
        //         dateTime: "2016-01-01 22:00:00"
        //     }, false);
        // } catch (error) {
        //     return callback("An error occured while saving an item into the database.", error);
        // }

        // return callback(null, {
        //     success: true,
        //     stickyNoteId: stickyNoteId
        // })

    }

};

module.exports = stickyNotes;

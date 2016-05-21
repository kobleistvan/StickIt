var JsonDB = require('node-json-db');
var ShortId = require('shortid');

var db = new JsonDB("./database/stickyNotesDB.json", true, true);

var stickyNotes = {

    // Return all the stickynotes of a user
    getAllStickyNotes: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        var stickyNotes;

        try {
            stickyNotes = db.getData("/");
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

    },

    // Add a new stickynote for a user
    addStickyNote: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        var currentUserId = "abcd12d4";

        try {
            db.push("/users/" + currentUserId + "/notes/" + ShortId.generate(), {
                    note: data.note,
                    dateTime: "2016-01-01 22:00:00"
                },
                false);
        } catch (error) {
            console.error(error);
            return callback("An error occured while saving an item into the database.", error);
        }

        return callback(null, {
            success: true
        })

    }

};

module.exports = stickyNotes;

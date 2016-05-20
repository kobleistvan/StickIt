var JsonDB = require('node-json-db');

var db = new JsonDB("database/stickyNotesDB", true, true);

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
        })

    },

    // Return a single stickynote of a user
    getStickyNote: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

    }

}

module.exports = stickyNotes;

var stickyNoteModels = rootRequire('lib/models/stickyNoteModels'),
    logger = require('winston');

// StickyNotes Controller
var stickyNotes = {

    // Add a new stickynote
    addStickyNote: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        stickyNoteModels.addStickyNote({
            userId: data.userId,
            note: data.note
        }, function(err, response) {
            if (err) {
                logger.error("An error occured while creating a new sticky note. Err: ", err);
                return callback(err);
            } else {
                return callback(null, response);
            }
        })
    },

    // Return every stickynote
    getEveryStickyNote: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        stickyNoteModels.getAllStickyNotes({
            userId: data.userId,
        }, function(err, response) {
            if (err) {
                logger.error("An error occured while fetching all the sticky notes. Err: ", err);
                return callback(err);
            } else {
                return callback(null, response);
            }
        })
    },

    // Return a specific stickynote by id
    getStickyNote: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        stickyNoteModels.getStickyNote({
            userId: data.userId,
            stickyNoteId: data.stickyNoteId
        }, function(err, response) {
            if (err) {
                logger.error("An error occured while fetching sticky note. Err: ", err);
                return callback(err);
            } else {
                return callback(null, response);
            }
        })
    },

    // Edit an existing stickynote by id
    editStickyNote: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        stickyNoteModels.editStickyNote({
            userId: data.userId,
            stickyNoteId: data.stickyNoteId,
            note: data.note
        }, function(err, response) {
            if (err) {
                logger.error("An error occured while editing a new sticky note. Err: ", err);
                return callback(err);
            } else {
                return callback(null, response);
            }
        })
    },

    // Delete an existing stickynote by id
    removeStickyNote: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        stickyNoteModels.deleteStickyNote({
            userId: data.userId,
            stickyNoteId: data.stickyNoteId
        }, function(err, response) {
            if (err) {
                logger.error("An error occured while deleting an existing sticky note. Err: ", err);
                return callback(err);
            } else {
                return callback(null, response);
            }
        })
    }

};

module.exports = stickyNotes;

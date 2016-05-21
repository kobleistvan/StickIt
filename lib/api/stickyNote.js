var stickyNoteModels = rootRequire('lib/models/stickyNoteModels'),
    logger = require('winston');

// StickyNotes Controller
var stickyNotes = {

    // Add a new stickynote
    addStickyNote: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        stickyNoteModels.addStickyNote({
            note: data.note
        }, function(err, response) {
            if (err) {
                logger.error("An error occured while creating a new sticky note. Err: ", err);
                return callback(err);
            } else {
                return callback(null, response);
            }
        })
    }
};

module.exports = stickyNotes;

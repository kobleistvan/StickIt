var stickyNoteModels = rootRequire('lib/models/stickyNoteModels');

// StickyNotes Controller
var stickyNotes = {

	// Add a new stickynote
	addStickyNote: function(data, callback) {
        callback = (typeof callback === 'function') ? callback : function() {};

        stickyNoteModels.addStickyNote({
        	note: data.note
        }, function(err, response) {

        })
	}
};


module.exports = stickyNotes

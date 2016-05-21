var express = require('express'),
    router = express.Router(),
    stickyNotes = rootRequire('lib/api/stickyNote');

// RESTful handlers to manage stickynotes

// Returns every sticky notes
router.get('/', function(req, res, next) {

    // Return every stickynote
    stickyNotes.getEveryStickyNote(null, function(err, response) {
        if (err) {
            return res.json({
                success: false,
                message: err
            })
        } else {
            return res.json({
                success: response.success,
                stickyNotes: response.stickyNotes
            })
        }
    })

});

// Returns a specific sticky note
router.get('/:id', function(req, res, next) {

    // Return stickynote
    stickyNotes.getStickyNote({
        stickyNoteId: req.params('id')
    }, function(err, response) {
        if (err) {
            return res.json({
                success: false,
                message: err
            })
        } else {
            return res.json({
                success: response.success,
                stickyNote: response.stickyNote
            })
        }
    })

});

// Creates a new stickynote
router.post('/', function(req, res, next) {

    // Validate
    if (!req.body.note) {
        return res.json({
            success: false,
            message: "Stickynote is empty."
        })
    }

    // Add new stickynote
    stickyNotes.addStickyNote({
        note: req.body.note
    }, function(err, response) {
        if (err) {
            return res.json({
                success: false,
                message: err
            })
        } else {
            return res.json({
                success: response.success,
                stickyNoteId: response.stickyNoteId
            })
        }
    })

});

// Updates a sticky note
router.put('/:id', function(req, res, next) {

    // Validate
    if (!req.body.note) {
        return res.json({
            success: false,
            message: "Stickynote is empty."
        })
    }

    // Edit stickynote
    stickyNotes.editStickyNote({
        stickyNoteId: req.params('id'),
        note: req.body.note
    }, function(err, response) {
        if (err) {
            return res.json({
                success: false,
                message: err
            })
        } else {
            return res.json({
                success: response.success
            })
        }
    })

});

// Deletes a stickynote
router.delete('/:id', function(req, res, next) {

    // Delete stickynote
    stickyNotes.removeStickyNote({
        stickyNoteId: req.params('id')
    }, function(err, response) {
        if (err) {
            return res.json({
                success: false,
                message: err
            })
        } else {
            return res.json({
                success: response.success
            })
        }
    })

});

module.exports = router;

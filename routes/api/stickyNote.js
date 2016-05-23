var express = require('express'),
    router = express.Router(),
    stickyNotes = rootRequire('lib/api/stickyNote');

// RESTful handlers to manage stickynotes

// Returns every sticky notes
router.get('/', function(req, res, next) {

    // Return every stickynote
    stickyNotes.getEveryStickyNote({
    	userId: req.decoded.userId
    }, function(err, response) {
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
    	userId: req.decoded.userId,
        stickyNoteId: req.params.id
    }, function(err, response) {
        if (err) {
            return res.json({
                success: false,
                message: err.message
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
    if (!req.body.title) {
        return res.json({
            success: false,
            message: "Stickynote doesn't have a title."
        })
    }

    // Add new stickynote
    stickyNotes.addStickyNote({
    	userId: req.decoded.userId,
        note: req.body.note,
        title: req.body.title
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
    if (!req.body.title) {
        return res.json({
            success: false,
            message: "Stickynote doesn't have a title."
        })
    }

    // Edit stickynote
    stickyNotes.editStickyNote({
    	userId: req.decoded.userId,
        stickyNoteId: req.params.id,
        note: req.body.note,
        title: req.body.title
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
    	userId: req.decoded.userId,
        stickyNoteId: req.params.id
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

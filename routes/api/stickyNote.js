var express = require('express'),
    router = express.Router(),
    stickyNotes = rootRequire('lib/api/stickyNote'),
    logger = require('winston');

// RESTful handlers to manage stickynotes

// Returns all the sticky notes
router.get('/', function(req, res, next) {
    logger.warn("test");

    res.json({
        todo: true
    });
});

// Returns a specific sticky note
router.get('/:id', function(req, res, next) {

    res.json({
        todo: true
    });
});

// Creates a new sticky note
router.post('/', function(req, res, next) {

    if (!req.body.note) {
        return res.json({
            success: false,
            message: "Sticky note is empty."
        })
    } else {
        stickyNotes.addStickyNote({
            note: req.body.note
        }, function(err, response) {
            if (err) {
                logger.error("An error occured while creating a new sticky note. Err: ", err);

                return res.json({
                    success: false,
                    message: err
                })

            } else {
                return res.json({
                    success: true
                })
            }
        })
    }

});

// Updates a sticky note
router.put('/:id', function(req, res, next) {

    res.json({
        todo: true
    });
});

// Deletes a sticky note
router.delete('/:id', function(req, res, next) {

    res.json({
        todo: true
    });
});

module.exports = router;

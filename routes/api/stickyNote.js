var express = require('express'),
    router = express.Router(),
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

    res.json({
        todo: true
    });
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

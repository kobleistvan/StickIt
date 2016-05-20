var express = require('express'),
    router = express.Router(),
	logger=require('winston');

// RESTful handlers to manage stickynotes

router.get('/', function(req, res, next) {
	logger.warn("test");
    res.json({
        todo: true
    })
});

router.get('/:id', function(req, res, next) {
    res.json({
        todo: true
    })
});

router.post('/', function(req, res, next) {
    res.json({
        todo: true
    })
});

router.put('/:id', function(req, res, next) {
    res.json({
        todo: true
    })
});

router.delete('/:id', function(req, res, next) {
    res.json({
        todo: true
    })
});

module.exports = router;

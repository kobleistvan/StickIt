var express = require('express'),
    router = express.Router(),
    stickyNote = require('./stickyNote');

// Define routes to various API related handlers
router.use('/stickyNote', stickyNote);

module.exports = router;

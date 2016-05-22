var express = require('express'),
    router = express.Router(),
    middlewares = rootRequire('routes/middlewares'),
    authentication = require('./authentication'),
    account = require('./account'),
    stickyNote = require('./stickyNote');

// Define routes to various API related handlers
router.use('/authentication', authentication);
router.use('/stickyNote', middlewares.requireToken, stickyNote);
// router.use('/account', middlewares.requireToken, account);

module.exports = router;

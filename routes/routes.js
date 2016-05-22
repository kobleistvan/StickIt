var express = require('express'),
    router = express.Router(),
    index = require('./web/index'),
    apiRoutes = require('./api/apiRoutes');

// Router middleware that encapsulates every routing for the available pages and API. DON'T INTERCHANGE THEM!

router.use('/api', apiRoutes);

// Catch 404 under /api routes
router.use('/api', function(req, res) {
    res.status(404);
    return res.json({
        message: 'These aren\'t the droids you\'re looking for... Move along.'
    });
});

// Serve the SPA
router.use('/', index); // Commented out due to the fact that I don't want to mix handlebars with angular, for now

module.exports = router;

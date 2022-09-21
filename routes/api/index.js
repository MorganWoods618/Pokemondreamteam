const router = require('express').Router();
const bookRoutes = require('./characterRoutes');

// Prefix all routes defined in `bookRoutes.js` with `/books
router.use('/characters', characterRoutes);

module.exports = router;
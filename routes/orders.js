var express = require('express');
var router = express.Router();

// Orders Page
router.get('/', function(req, res, next) {
    res.render('orders', { title: 'Nerd Nook Orders' });
  });

module.exports = router;
var express = require('express');
var router = express.Router();

// Contact Page
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact Nerd Nook' });
});

module.exports = router;

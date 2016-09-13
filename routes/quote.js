var express = require('express');
var router = express.Router();

/* GET course quoting. */
router.get('/', function (req, res) {
    res.render('quote', { title: 'Cotización de cursos' });
});

module.exports = router;

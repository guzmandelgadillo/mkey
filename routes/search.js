var express = require('express');
var router = express.Router();

/* GET course searching. */
router.get('/', function (req, res) {
    res.render('search', { title: 'Búsqueda de cursos' });
});

module.exports = router;

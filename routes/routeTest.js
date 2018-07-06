var express = require('express');
var router = express.Router();



router.get('/', function (req, res) {
    res.render('../views/test', {
        message: "Bonjour et bienvenue sur le test du server"
    })
});


module.exports = router;

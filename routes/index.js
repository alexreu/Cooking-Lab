var express = require('express');
var router = express.Router();
var utilisateurs = require('../controllers/utilisateursController');

/* GET home page. */
router.get('/', utilisateurs.home);

router.get('/logout', utilisateurs.logout);

module.exports = router;

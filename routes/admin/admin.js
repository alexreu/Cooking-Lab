var express = require('express');
var router = express.Router();
var admin = require('../../controllers/adminController');

router.get('/', admin.login);

router.get('/index', admin.index);

router.post('/login', admin.auth);

router.post('/add', admin.add);

router.post('/edit');

module.exports = router;
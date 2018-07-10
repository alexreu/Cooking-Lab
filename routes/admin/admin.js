var express = require('express');
var router = express.Router();
var admin = require('../../controllers/adminController');

function requireLogin (req, res, next) {
    if (req.session && req.session.adminId) {
        next();
    }else {
        var err = new Error('error 404');
        err.status = 401;
        res.redirect('/admin');
    }
}


router.get('/', admin.login);

router.get('/index', requireLogin, admin.index);

router.get('/user', requireLogin, admin.listUser);

router.get('/logout', requireLogin, admin.logout);

router.post('/login', admin.auth);

router.post('/add', requireLogin, admin.add);

router.post('/edit', requireLogin, admin.edit);

module.exports = router;
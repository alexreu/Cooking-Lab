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

// route qui fait un rendu sur la view admin/login
router.get('/', admin.login);

// route qui fait un rendu  sur la view admin/index
router.get('/index', requireLogin, admin.index);

// route qui fait un rendu sur la view admin/userList
router.get('/user', requireLogin, admin.listUser);

// route qui permet de se déconnecter de l'admin
router.get('/logout', requireLogin, admin.logout);

// route qui permet de créer un admin
router.get('/create', requireLogin, admin.createAdmin);

// route qui fait un rendu sur admin/addAdmin
router.get('/atelier', requireLogin, admin.listAtelier);

// route qui permet de supprimer un utilisateur
router.get('/delete/:id', requireLogin, admin.delete);

// route qui permet de supprimer  une atelier affecter à un cuisinier
router.get('/deleteAtelier/:id', requireLogin, admin.deleteAtelier);

// route qui permet de se logger en admin
router.post('/login', admin.auth);

// router qui permet d'ajout un admin
router.post('/add', requireLogin, admin.add);

// route qui permet d'editer un utilisateur
router.post('/edit', requireLogin, admin.edit);

// route qui permet de supprimer une affectation
router.post('/delAffect', requireLogin, admin.delAffect);

module.exports = router;
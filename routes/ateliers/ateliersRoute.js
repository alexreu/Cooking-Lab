var express = require ('express');
var router = express.Router();

var ateliers = require("../../controllers/ateliersControllers");

// fonction qui empeche l'acces a la route si la session n'est pas definie
// TODO utiliser ACL
function requireLogin (req, res, next) {
	if (req.session && req.session.userId && req.session.userRole === 'cuisinier') {
		next();
	}else {
		var err = new Error('error 404');
		err.status = 401;
		res.redirect('/');
	}
}

// route permettant d'afficher la liste des ateliers 
router.get ('/', requireLogin, ateliers.lister);

// route generer la page de creation d'un atelier
router.get('/creer', requireLogin, ateliers.creer);

 // router permettant de sauvegarder l'atelier en bdd
router.post('/save', requireLogin, ateliers.save);

// route peremettant d'éditer un atelier
router.post('/edit', requireLogin, ateliers.edit);

// route peremmant de désactiver un atelier
router.get('/desactiver/:id', ateliers.desactiver);

// route peremmant d'activer un atelier
router.get('/activer/:id', ateliers.activer);


// module permettant d'exporter router
module.exports = router;



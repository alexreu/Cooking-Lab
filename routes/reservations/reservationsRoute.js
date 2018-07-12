var express = require ('express');
var router = express.Router();

var reservations = require("../../controllers/reservationsController");

// fonction qui empeche l'acces a la route si la session n'est pas definie
function requireLogin (req, res, next) {
	if (req.session && req.session.userId && req.session.userRole !== 'cuisinier') {
		next();
	}else {
		var err = new Error('error 404');
		err.status = 401;
		res.redirect('/');
	}
}

//Route permettant de valider l'inscription à un atelier
router.post('/save', reservations.save);

//Route permettant de lister les atelier reserver de l'utilisateur
router.get('/mesAteliers', requireLogin, reservations.list);

// Route qui permet de supprimer une reservation
router.get('/delete/:id', requireLogin, reservations.delete);

// Route permettant de décrement le nombre de places dispo
router.post('/delReserv', requireLogin, reservations.delReserv);
// module permettant d'exporter router
module.exports = router;
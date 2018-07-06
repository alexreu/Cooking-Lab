var express = require ('express');
var router = express.Router();

var ateliers = require("../controllers/ateliersControllers");


// route permettant d'afficher la liste des ateliers 
router.get ('/', ateliers.lister);

// route generer la page de creation d'un atelier
router.get('/creer', ateliers.creer);

 // router permettant de sauvegarder l'atelier en bdd
router.post('/save', ateliers.save);

// // route peremettant d'éditer un atelier
// route.post('/editer', atelier.editer);

// // route peremmant de désactiver un atelier 
// route.get('/desactiver', ateliers.desactiver);


// module permettant d'exporter router
module.exports = router;



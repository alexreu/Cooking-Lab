var express = require ('express');
var router = express.Router();

var ateliersPublics = require("../../controllers/ateliersPublicsController")


// route permettant d'afficher la liste des ateliers disponibles à l'inscription
router.get('/', ateliersPublics.lister);

// router permettant d'ajout une reservation d'atelier
router.post('/addReserv', ateliersPublics.addReserv);


// module permettant d'exporter router
module.exports = router;

var express = require ('express');
var router = express.Router();

var ateliersPublics = require("../../controllers/ateliersPublicsController")



// route permettant d'afficher la liste des ateliers disponibles à l'inscription
router.get('/', ateliersPublics.lister);



// module permettant d'exporter router
module.exports = router;

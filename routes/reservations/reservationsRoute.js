var express = require ('express');
var router = express.Router();

var reservations = require("../../controllers/reservationsController");

//Route permettant de valider l'inscription à un atelier
router.post('/save', reservations.save);

//Route permettant de lister les atelier reserver de l'utilisateur
router.get('/mesAteliers', reservations.list);

// module permettant d'exporter router
module.exports = router;
var express = require('express');
var router = express.Router();


var utilisateur = require("../controllers/utilisateursController");

//Fonction qui sauvegarde un utilisateur
router.post("/save", utilisateur.save);

// Fonction login d'un utilisateur
router.post("/login", utilisateur.login);


// module permmettant d'exporter le router utilisateur
module.exports = router;
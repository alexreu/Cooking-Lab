var express = require('express');
var router = express.Router();


var utilisateur = require("../controllers/utilisateursController");

// function requireLogin (req, res, next) {
//     if (req.session && req.session.userId) {
//         next();
//     }else {
//         var err = new Error('error 404');
//         err.status = 401;
//         res.redirect('/admin');
//     }
// };

/* GET home page. */
//router.get('/', requireLogin, personne.list );

//Fonction qui crée un utilisateur
router.get("/creer", utilisateur.create);

//Fonction qui sauvegarde un utilisateur
router.post("/save", utilisateur.save);

// Supprimer une personne
//router.get("/delete/:id", personne.delete);


//editer une personne
//router.post("/edit", personne.edit);


// module permmettant d'exporter le router utilisateur
module.exports = router;
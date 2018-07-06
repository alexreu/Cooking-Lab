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

//cree une personne
router.get("/creer", personne.create);

//sauvegarder une personne
router.post("/save", personne.save);

// Supprimer une personne
//router.get("/delete/:id", personne.delete);


//editer une personne
//router.post("/edit", personne.edit);


// module permmettant d'exporter le router utilisateur
module.exports = router;
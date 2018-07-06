//Controller pour les utilisateurs
var mongoose = require('mongoose');

var utilisateur = require("../models/utilisateurs");

var utilisateursController = {};

// Fonction  qui permet de renvoyer vers le formulaire d'inscription d'un utilisateur
utilisateursController.create = function(req, res){
    res.render("../views/utilisateurs/addUtilisateur");//, {error: req.session.error}
}; 

//fonction qui permet l'enregistrement d'un nouvel utilisateur
utilisateursController.save = function(req, res){

    var utilisateur = new utilisateur(req.body);
    utilisateur.save(function(err){
        if(err){
        //req.body.error = 'Echec création utilisateur'
            console.log(err);
            res.redirect("/#inscription-utilisateur");

        } else{
            console.log("creation utilisateur OK");
         //   req.session.success = 'Utilisateur créé et enregistré avec succès'
            res.redirect("/ateliers");
    
        } 
    });
};

// module qui permet d'exporter le Controller utilisateur
module.exports = utilisateursController;

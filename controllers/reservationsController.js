// export du module 
var mongoose = require ('mongoose');
var reservations = require('../models/reservationsModel');


// controller ateliersP
var reservationsController = {};



//Fonction qui permet de sauvegarder une inscription à un atelier dans la table réservation
reservationsController.save = function (req,res){
    var id_user = req.session.userId;
    var id_atelier =  req.params.id;
    console.log("premier"+req.params.id);
    console.log("deuxième"+req.session.userId);
    reservations.save(function(err,reservations) {
        if(err){
            console.log("error")
        }else {
            console.log("Inscription réussie");
            res.redirect('/ateliersPublicsRoute');
        }

    })
 }


// exportation du controller
module.exports= reservationsController;
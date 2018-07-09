// export du module 
var mongoose = require ('mongoose');
var reservations = require('../models/reservationsModel');
var atelier = require('../models/ateliersModel');


// controller ateliersP
var reservationsController = {};

reservations.schema.pre('save', function(next){

})

//Fonction qui permet de sauvegarder une inscription à un atelier dans la table réservation
reservationsController.save = function (req, res){
    var id_user = req.session.userId;
    var id_atelier =  req.body.id_atelier;

    var reservation = {
        id_user : id_user,
        id_ateliers: id_atelier,
    };
    var reservation = new reservations (reservation);

    reservation.save(function(err) {
        if(err){
            console.log("error")
        }else {
            console.log("Inscription réussie");
            res.redirect('/ateliersPublicsRoute');
        }

    })
 };


// exportation du controller
module.exports= reservationsController;
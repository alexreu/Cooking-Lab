// export du module 
var mongoose = require ('mongoose');
var reservations = require('../models/reservationsModel');

var reservationsController = {};

//Fonction qui permet de lister les atelier reserver par un utilisateur
reservationsController.list = function(req, res){
    reservations.find({}).
    populate('id_user').
    populate('id_ateliers').exec(function (err, ateliers) {
        if(!err){
            console.log(req.session.userRole);
            res.render('../views/mesAteliers',
                {
                    ateliers: ateliers,
                    message: 'Mes Ateliers',
                    id: req.session.userId,
                    role: req.session.userRole,
                    username: req.session.userName,
                }
            )
        }else{
            console.log('error =>', err);
        }
    })
}


//Fonction qui permet de sauvegarder une inscription à un atelier dans la table réservation
reservationsController.save = function (req, res){
    var id_user = req.session.userId;
    var id_atelier =  req.body.id_atelier;
    var reservation = {
        id_user : id_user,
        id_ateliers: id_atelier,
    };
    var reservation = new reservations (reservation);
    reservation.save(function(err,reservations) {
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
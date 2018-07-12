var mongoose = require('mongoose');
var ateliersAffecter = require('../models/ateliersAffecter');

var atelierAffecterController = {};

// Fonction qui permet d'afficher la liste des ateliers
atelierAffecterController.lister= function (req, res){
	ateliersAffecter.find({}).
    populate('id_atelier').
    populate('id_cuisinier').
    exec(function(err, ateliers){
		if (!err){
		    console.log(ateliers);
            res.render("../views/ateliers/ateliers", {
                data: ateliers,
                id: req.session.userId,
                role: req.session.userRole,
                username: req.session.userName,
                message : "Cooking'Lab - Gestion des Ateliers",
            })
		}else{
            console.log('Error: ', err);
		}
	});
};


module.exports = atelierAffecterController;
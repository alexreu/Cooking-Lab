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
            res.render("../views/ateliers/ateliers", {
                data: ateliers,
                id: req.session.userId,
                role: req.session.userRole,
                username: req.session.userName,
            })
		}else{
            console.log('Error: ', err);
		}
	});
};


module.exports = atelierAffecterController;
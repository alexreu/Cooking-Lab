var mongoose = require('mongoose');
var ateliersAffecter = require('../models/ateliersAffecter');

var atelierAffecterController = {};


// atelierAffecterController.save = function(req, res, next){
//     console.log(document);
//     //var atelierAffecter = new ateliersAffecter(document)
//
// };

// Fonction qui permet d'afficher la liste des ateliers
atelierAffecterController.lister= function (req, res){
	ateliersAffecter.find({}).
    populate('id_atelier').
    populate('id_cuisinier').
    exec(function(err, ateliers){

		if (err){
			console.log('Error: ', err);
		}else{
			res.render("../views/ateliers/ateliers", {
				data: ateliers,
				id: req.session.userId,
				role: req.session.userRole,
				username: req.session.userName,
			})
		}
	});

};



module.exports = atelierAffecterController;
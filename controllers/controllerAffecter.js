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
        console.log(ateliers[1].id_cuisinier[0]._id);
        console.log(req.session.userId);
        console.log(req.session.userId == ateliers[1].id_cuisinier[0]._id);
		if (err){
			console.log('Error: ', err);
		}else{
			res.render("../views/ateliers/ateliers", {
				data: ateliers,
                userId: req.session.userId,
			})
		}
	});

};



module.exports = atelierAffecterController;
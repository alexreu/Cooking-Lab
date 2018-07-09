// export du module 
var mongoose = require ('mongoose');
var ateliers = require('../models/ateliersModel');


// controller ateliersP
var ateliersPublicsController = {};



// Fonction qui permet d'afficher la liste des ateliers disponibles à l'inscription
ateliersPublicsController.lister= function (req, res){
	ateliers.find({}).exec(function(err, ateliers){
		if (err){
			console.log('Error: ', err);
		}else{
			res.render("../views/index/ateliersPublics", {
				data: ateliers
			})
		}
	});

};





// exportation du controller
module.exports= ateliersPublicsController;
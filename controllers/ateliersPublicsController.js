// export du module 
var mongoose = require ('mongoose');
var ateliers = require('../models/ateliersModel');
var ateliersPrivate = require('../controllers/ateliersControllers');
var ateliersReserv = require('../models/reservationsModel');


// controller ateliersP
var ateliersPublicsController = {};



// Fonction qui permet d'afficher la liste des ateliers disponibles à l'inscription
ateliersPublicsController.lister= function (req, res){
	ateliers.find({}).exec(function(err, ateliers){
		if (!err){
            res.render("../views/index/ateliersPublics", {
                data: ateliers,
                id: req.session.userId,
                role: req.session.userRole,
				username: req.session.userName,
				message : "Cooking'Lab - Nos Ateliers",
            })
        }else{
            console.log('Error: ', err);
        }
	});

};

// Fonction qui permet d'ajouter une reservation à un atelier
ateliersPublicsController.addReserv = function(req, res){
	var id = req.body.id;
	ateliers.findByIdAndUpdate(id, {
		$inc: {
			nb_place_res: +1,
		}
	}, function (err, result) {
		if(!err){
            res.status(200).send(result);
		}else {
            res.status(500).send({error : err});
		}
	})
};


// exportation du controller
module.exports= ateliersPublicsController;